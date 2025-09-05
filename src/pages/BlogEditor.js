// src/pages/BlogEditor.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";
import { getApiBase } from "../config/api";

// ---- TIPTAP ----
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";

// ---- HELPERS ----
const stripHtml = (html = "") =>
  html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// ---- REUSABLE MODALS ----
function MessageModal({ show, type = "info", title, message, children, onClose }) {
  if (!show) return null;

  const colors = {
    success: "text-success",
    error: "text-danger",
    info: "text-primary",
    warning: "text-warning",
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "520px" }}
      >
        <div className="modal-header">
          <h5 className={`modal-title ${colors[type] || ""}`}>{title}</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {typeof message === "string" ? <p className="mb-0">{message}</p> : message}
          {children}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmLeaveModal({ show, onStay, onLeave }) {
  if (!show) return null;
  return (
    <div className="modal-overlay" onClick={onStay}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "520px" }}
      >
        <div className="modal-header">
          <h5 className="modal-title text-warning">Unsaved Changes</h5>
          <button type="button" className="btn-close" onClick={onStay}></button>
        </div>
        <div className="modal-body">
          <p className="mb-0">
            You have unsaved changes. If you leave this page, your changes will be lost.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline-secondary" onClick={onStay}>
            Stay on Page
          </button>
          <button className="btn btn-danger" onClick={onLeave}>
            Leave Page
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- TIPTAP FIELD ----
function TiptapField({
  value,
  onChange,
  minChars = 50,
  placeholder = "Start writing your blog content here…",
  onUploadImageFile, // async (file) => url
}) {
  const fileInputRef = React.useRef(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState("");

  const editor = useEditor({
    extensions: [
      // Avoid duplicate Link warning: disable built-in link
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({
        HTMLAttributes: {
          style: "max-width: 100%; height: auto;",
          onerror:
            'this.style.display="none"; this.nextElementSibling && (this.nextElementSibling.style.display="block");',
        },
      }),
      Placeholder.configure({ placeholder }),
      CharacterCount,
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "form-control admin-form-control pt-2 px-3 pb-4 border-0 h-100",
        style: "height:100%;min-height:100%;box-sizing:border-box;",
      },
      handlePaste(view, event) {
        const items = event.clipboardData?.items || [];
        const fileItem = Array.from(items).find((i) => i.kind === "file");
        if (fileItem) {
          const file = fileItem.getAsFile();
          if (file && onUploadImageFile) {
            event.preventDefault();
            uploadAndInsert(file);
            return true;
          }
        }
        return false;
      },
      handleDrop(view, event) {
        const files = event.dataTransfer?.files || [];
        if (files.length && onUploadImageFile) {
          const file = files[0];
          if (file?.type?.startsWith("image/")) {
            event.preventDefault();
            uploadAndInsert(file);
            return true;
          }
        }
        return false;
      },
    },
  });

  // Keep editor content in sync when parent value changes (important for edit mode)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if ((value || "") !== current) {
      editor.commands.setContent(value || "", false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  const tooShort = stripHtml(value || "").length < minChars;
  const pressed = (name, attrs) => editor?.isActive(name, attrs);
  const run = (fn) => () => editor && editor.chain().focus() && fn().run();

  const openFilePicker = () => fileInputRef.current?.click();

  const uploadAndInsert = async (file) => {
    if (!editor || !onUploadImageFile) return;
    setUploadError("");
    setIsUploading(true);
    try {
      const url = await onUploadImageFile(file);
      editor.chain().focus().setImage({ src: url }).run();
      setUploadError("");
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError(err?.message || "Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // reset input so same file can be selected again
    if (file) uploadAndInsert(file);
  };

  if (!editor) return null;

  return (
    <div className="mb-4">
      {/* Toolbar */}
      <div className="d-flex flex-wrap gap-2 mb-2 align-items-center">
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          aria-pressed={pressed("bold")}
          onClick={run(() => editor.chain().toggleBold())}
        >
          Bold
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          aria-pressed={pressed("italic")}
          onClick={run(() => editor.chain().toggleItalic())}
        >
          Italic
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          aria-pressed={pressed("strike")}
          onClick={run(() => editor.chain().toggleStrike())}
        >
          Strike
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          aria-pressed={pressed("heading", { level: 1 })}
          onClick={run(() => editor.chain().toggleHeading({ level: 1 }))}
        >
          H1
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          aria-pressed={pressed("heading", { level: 2 })}
          onClick={run(() => editor.chain().toggleHeading({ level: 2 }))}
        >
          H2
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          aria-pressed={pressed("bulletList")}
          onClick={run(() => editor.chain().toggleBulletList())}
        >
          • List
        </button>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          aria-pressed={pressed("orderedList")}
          onClick={run(() => editor.chain().toggleOrderedList())}
        >
          1. List
        </button>

        {/* Insert link via prompt */}
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (!url) return;
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }}
        >
          Link
        </button>

        {/* Upload from device */}
        <button
          type="button"
          className="btn btn-sm btn-brand-primary"
          onClick={openFilePicker}
          disabled={isUploading}
          title="Upload image"
        >
          {isUploading ? "Uploading…" : "Upload Image"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onFileChange}
        />

        <button
          type="button"
          className="btn btn-sm btn-outline-secondary ms-auto"
          onClick={() => {
            if (editor) {
              editor.chain().focus().clearContent().run();
            }
          }}
        >
          Clear
        </button>
      </div>

      {/* Editor */}
      <div
        className={`border rounded ${tooShort ? "is-invalid" : ""}`}
        style={{
          height: 400,
          display: "flex",
          overflow: "auto",
        }}
      >
        <EditorContent
          editor={editor}
          style={{
            flex: "1",
          }}
        />
      </div>

      {/* Character count (plain text) */}
      <div className="text-muted small text-end mt-1">
        {stripHtml(value || "").length} characters
      </div>

      {uploadError && (
        <div className="text-danger mt-2 small">⚠️ {uploadError}</div>
      )}

      {tooShort && (
        <div className="invalid-feedback d-block">
          Content must be at least {minChars} characters long
        </div>
      )}
      <small className="text-muted">
        Tip: You can also paste or drag-drop an image to upload automatically.
      </small>
    </div>
  );
}

// ---- MAIN ----
function BlogEditor() {

   // resolve stored image path to a full URL
    const resolveImageUrl = (url) => {
      if (!url) return "";
      if (/^https?:\/\//i.test(url)) return url;
      return `${getApiBase()?.replace(/\/+$/,"")}/${String(url).replace(/^\/+/,"")}`;
    };

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showSEOModal, setShowSEOModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // image preview modal
  const [imgModal, setImgModal] = useState({ open: false, src: "" });

  // NEW: for confirm-leave
  const [confirmLeave, setConfirmLeave] = useState({ show: false, targetHref: null });

  // NEW: message modal state + redirect countdown
  const [modal, setModal] = useState({
    show: false,
    type: "info",
    title: "",
    message: "",
  });
  const [redirectCountdown, setRedirectCountdown] = useState(0);

  const navigate = useNavigate();

  const showModal = (type, title, message) => {
    setModal({ show: true, type, title, message });
  };

  // Replace native confirm in safeNavigate with our modal
  const safeNavigate = (path) => {
    if (hasUnsavedChanges) {
      setConfirmLeave({ show: true, targetHref: path });
    } else {
      navigate(path);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
    watch,
    trigger,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      tags: "",
      content: "",
      seoTitle: "",
      seoDescription: "",
    },
  });

  const handleSaveSEO = async () => {
    // Trim inputs before validating/saving
    setValue("seoTitle", (getValues("seoTitle") || "").trim(), {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("seoDescription", (getValues("seoDescription") || "").trim(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  
    // Validate only SEO fields
    const ok = await trigger(["seoTitle", "seoDescription"]);
    if (!ok) {
      // Errors will render under the fields; keep the modal open
      return;
    }
  
    // Optionally show a toast/modal that it's saved (if you have showModal)
    if (typeof showModal === "function") {
      showModal("success", "SEO Saved", "Your SEO settings have been saved.");
    }
  
    // Close the SEO modal
    setShowSEOModal(false);
  };
  

  // load edit mode
  useEffect(() => {
    const storedData = localStorage.getItem("editBlogData");
    if (storedData) {
      try {
        const blogData = JSON.parse(storedData);
        setEditData(blogData);
        setIsEditMode(true);

        setValue("title", blogData.title || "");
        setValue("tags", blogData.tags ? blogData.tags.join(", ") : "");
        setValue("seoTitle", blogData.seoTitle || "");
        setValue("seoDescription", blogData.seoDescription || "");
        setContent(blogData.content || "");

        localStorage.removeItem("editBlogData");
      } catch {
        localStorage.removeItem("editBlogData");
      }
    }
  }, [setValue]);

  // mark unsaved changes on any field change
  useEffect(() => {
    const subscription = watch((_, { type }) => {
      if (type === "change") setHasUnsavedChanges(true);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // warn before unload (browser close/refresh)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes.";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

// Intercept ANY anchor clicks (navbar/footer/anywhere) when there are unsaved changes
useEffect(() => {
  const onDocClick = (e) => {
    const anchor = e.target.closest?.("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (!href) return;

    // Build a URL relative to the current page; ignore invalid URLs
    let url;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }

    // Ignore in-page anchors and non-navigation schemes (mailto, tel)
    const isInPage =
      url.hash &&
      url.pathname === window.location.pathname &&
      url.search === window.location.search;

    const nonNavSchemes = ["mailto:", "tel:"];
    if (isInPage || nonNavSchemes.includes(url.protocol)) return;

    // If trying to leave and we have unsaved changes, show modal
    if (hasUnsavedChanges) {
      e.preventDefault();
      setConfirmLeave({ show: true, targetHref: url.href });
    }
  };

  document.addEventListener("click", onDocClick);
  return () => document.removeEventListener("click", onDocClick);
}, [hasUnsavedChanges]);


  // Auto-redirect countdown effect
  useEffect(() => {
    if (redirectCountdown <= 0) return;
    const id = setInterval(() => {
      setRedirectCountdown((s) => {
        if (s <= 1) {
          clearInterval(id);
          navigate("/bloglist");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [redirectCountdown, navigate]);

  const onSubmit = async (data) => {
    const textContent = stripHtml(content);
    if (textContent.length < 50) {
      showModal("warning", "Content Too Short", "Content must be at least 50 characters long.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", content);
      if (image) formData.append("image", image);
      if (data.tags) formData.append("tags", data.tags);
      if (data.seoTitle) formData.append("seoTitle", data.seoTitle);
      if (data.seoDescription) formData.append("seoDescription", data.seoDescription);

      if (isEditMode && editData) {
        await axios.put(`${normalizeJoin(getApiBase(), "/api/blogs")}/${editData.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showModal("success", "Blog Updated", "✅ Your blog has been updated successfully!");
      } else {
        await axios.post(normalizeJoin(getApiBase(), "/api/blogs"), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        // success + 5s redirect
        setRedirectCountdown(5);
        showModal(
          "success",
          "Blog Created",
          <>
            <div className="mb-2">✅ Your blog has been created successfully!</div>
            <div>Redirecting to Manage Blogs in <strong>{5}</strong> seconds…</div>
          </>
        );
      }

      reset();
      setImage(null);
      setIsEditMode(false);
      setEditData(null);
      setContent("");
      setIsSubmitting(false);
      setHasUnsavedChanges(false);

      // If you also want to auto-redirect after update, uncomment:
      // navigate("/bloglist");
    } catch (err) {
      console.error(err);
      showModal(
        "error",
        isEditMode ? "Update Failed" : "Save Failed",
        isEditMode
          ? "❌ There was a problem updating your blog. Please try again."
          : "❌ There was a problem saving your blog. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        showModal("warning", "Invalid File", "Please select a valid image file (JPG, PNG, WEBP or GIF).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showModal("warning", "File Too Large", "Image size must be less than 5MB.");
        return;
      }
      setImage(file);
      setHasUnsavedChanges(true);
    }
  };

  const isFormValid = () => {
    const textContent = stripHtml(content);
    const hasImage = image || (isEditMode && editData?.image);
    return isValid && hasImage && textContent.length >= 50;
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setConfirmLeave({ show: true, targetHref: "/bloglist" });
    } else {
      reset();
      setImage(null);
      setIsEditMode(false);
      setEditData(null);
      setContent("");
      setHasUnsavedChanges(false);
      navigate("/bloglist");
    }
  };

  // Utility: safe path join for base + path (prevents double slashes)
  function normalizeJoin(base, path) {
    const a = (base || "").replace(/\/+$/, "");
    const p = (path || "").replace(/^\/+/, "");
    return `${a}/${p}`;
  }

  // Upload an image file to your backend and return the public URL
  const uploadImageFile = async (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) throw new Error("Unsupported image type");
    if (file.size > 5 * 1024 * 1024) throw new Error("Image must be < 5MB");

    const base = getApiBase();
    const candidates = [
      normalizeJoin(base, "/api/uploads"),
      normalizeJoin(base, "/api/upload"),
      normalizeJoin(base, "/uploads"),
    ];

    const fieldNames = ["file", "image"];

    let lastErr;
    for (const url of candidates) {
      for (const field of fieldNames) {
        try {
          const fd = new FormData();
          fd.append(field, file);
          const res = await axios.post(url, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (res?.data?.url) return res.data.url;
          if (typeof res?.data === "string" && /^https?:\/\//.test(res.data)) return res.data;
          throw new Error("Missing URL in response");
        } catch (e) {
          lastErr = e;
        }
      }
    }
    console.error("Upload failed after trying endpoints:", candidates, lastErr);
    throw new Error(
      `Upload failed: ${lastErr?.response?.data?.error || lastErr?.message || "Unknown error"}`
    );
  };

  // Confirm-leave handlers
  const stayOnPage = () => setConfirmLeave({ show: false, targetHref: null });
  const leavePage = () => {
    const href = confirmLeave.targetHref;
    setConfirmLeave({ show: false, targetHref: null });
    if (!href) return;
    if (href.startsWith("/")) {
      navigate(href);
    } else {
      window.location.assign(href);
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="admin-card">
              <div className="card-header admin-card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <h2 className="h3 mb-0 pb-3">
                      {isEditMode ? "Edit Blog" : "Create Blog"}
                    </h2>
                    {hasUnsavedChanges && (
                      <span className="badge bg-warning text-dark ms-3">
                        ⚠️ Unsaved Changes
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-brand btn-sm"
                    onClick={() => setShowSEOModal(true)}
                  >
                    🔍 SEO Settings
                  </button>
                </div>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Title */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold admin-form-label">
                      Blog Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg admin-form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      placeholder="Enter blog title"
                      {...register("title", {
                        required: "Title is required",
                        minLength: {
                          value: 10,
                          message: "Title must be at least 10 characters",
                        },
                        maxLength: {
                          value: 200,
                          message: "Title must be less than 200 characters",
                        },
                        // NOTE: If you want multilingual titles, remove pattern below.
                        pattern: {
                          value: /^[a-zA-Z0-9\s\-_.,!?()&:;"'–—…]+$/,
                          message: "Title contains invalid characters",
                        },
                      })}
                    />
                    {errors.title && (
                      <div className="invalid-feedback d-block">
                        {errors.title.message}
                      </div>
                    )}
                  </div>

                  {/* Image */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold admin-form-label">
                      Upload Image <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control admin-form-control"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {image && (
                      <div className="mt-2">
                        <small className="text-success">
                          ✅ Selected: {image.name} (
                          {(image.size / 1024 / 1024).toFixed(2)}MB)
                        </small>
                      </div>
                    )}
                    {isEditMode && editData?.image && !image && (
                      <div className="mt-2">
                        <small className="text-info d-block mb-1">
                          📷 Current image: {String(editData.image).split("/").pop()}
                        </small>
                        <img
                          src={resolveImageUrl(editData.image)}
                          alt="Current"
                          style={{
                            maxWidth: 140,
                            height: "auto",
                            borderRadius: 6,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                            cursor: "zoom-in",
                            display: "block"
                          }}
                          onClick={() =>
                            setImgModal({ open: true, src: resolveImageUrl(editData.image) })
                          }
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <small className="text-muted mt-1 d-block">
                      {isEditMode
                        ? "Upload a new image to replace the current one, or keep the existing image."
                        : "Select an image file (JPG, PNG, WEBP or GIF, max 5MB) & Ideal image size should be 1920*1080px"}
                    </small>
                  </div>

                  {/* Tags */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold admin-form-label">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      className={`form-control admin-form-control ${
                        errors.tags ? "is-invalid" : ""
                      }`}
                      placeholder="e.g. Culture, Fashion, Heritage"
                      {...register("tags", {
                        pattern: {
                          value: /^[a-zA-Z0-9\s,]+$/,
                          message:
                            "Tags can only contain letters, numbers, spaces, and commas",
                        },
                        validate: (value) => {
                          if (value) {
                            const tags = value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean);
                            if (tags.length > 5)
                              return "Maximum 5 tags allowed";
                            for (let tag of tags) {
                              if (tag.length < 2)
                                return "Each tag must be at least 2 characters";
                              if (tag.length > 20)
                                return "Each tag must be less than 20 characters";
                            }
                          }
                          return true;
                        },
                      })}
                    />
                    {errors.tags && (
                      <div className="invalid-feedback d-block">
                        {errors.tags.message}
                      </div>
                    )}
                  </div>

                  {/* Content (Tiptap) */}
                  <label className="form-label fw-semibold admin-form-label">
                    Content <span className="text-danger">*</span>
                  </label>
                  <TiptapField
                    value={content}
                    onChange={(html) => {
                      setContent(html);
                      setValue("content", html);
                      setHasUnsavedChanges(true);
                    }}
                    onUploadImageFile={uploadImageFile}
                  />

                  {/* Actions */}
                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-lg flex-grow-1 border-0 text-white btn-admin-primary"
                      disabled={!isFormValid() || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          {isEditMode ? "Updating Blog..." : "Saving Blog..."}
                        </>
                      ) : isEditMode ? (
                        "Update Blog"
                      ) : (
                        "Save Blog"
                      )}
                    </button>

                    {isEditMode && (
                      <>
                        <button
                          type="button"
                          className="btn btn-lg btn-outline-secondary"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-lg btn-outline-brand"
                          onClick={() => safeNavigate("/bloglist")}
                        >
                          ← Back to Manage
                        </button>
                      </>
                    )}
                  </div>

                  {/* Status */}
                  {isEditMode && (
                    <div className="mt-3 text-center">
                      <small className="text-muted">
                        {isFormValid()
                          ? "✅ Form is ready to update"
                          : "⚠️ Please fill all required fields to update"}
                      </small>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Settings Modal */}
      {showSEOModal && (
        // No onClick on the overlay => clicking outside will NOT close the modal
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h5 className="modal-title">🔍 SEO Settings</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowSEOModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {/* SEO Title */}
              <div className="mb-3">
                <label className="form-label fw-semibold admin-form-label">
                  SEO Title
                  <small className="text-muted ms-2">(for search engines)</small>
                </label>
                <input
                  type="text"
                  className={`form-control admin-form-control ${
                    errors.seoTitle ? "is-invalid" : ""
                  }`}
                  placeholder="e.g. Best Bridal Collection 2024 - HS India Fashion"
                  {...register("seoTitle", {
                    maxLength: {
                      value: 60,
                      message: "SEO title must be less than 60 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9\s\-_.,!?()&:;"'–—…]+$/,
                      message: "SEO title contains invalid characters",
                    },
                  })}
                />
                {errors.seoTitle && (
                  <div className="invalid-feedback d-block">
                    {errors.seoTitle.message}
                  </div>
                )}
                <small className="text-muted">
                  Leave empty to use the main title. Keep under 60 characters for
                  best search results.
                </small>
              </div>

              {/* SEO Description */}
              <div className="mb-3">
                <label className="form-label fw-semibold admin-form-label">
                  Meta Description
                  <small className="text-muted ms-2">(for search engines)</small>
                </label>
                <textarea
                  className={`form-control admin-form-control ${
                    errors.seoDescription ? "is-invalid" : ""
                  }`}
                  rows="3"
                  placeholder="e.g. Discover our exclusive bridal collection featuring traditional Indian designs with modern elegance."
                  {...register("seoDescription", {
                    maxLength: {
                      value: 160,
                      message: "Meta description must be less than 160 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9\s\-_.,!?()&:;"'–—…]+$/,
                      message: "Meta description contains invalid characters",
                    },
                  })}
                />
                {errors.seoDescription && (
                  <div className="invalid-feedback d-block">
                    {errors.seoDescription.message}
                  </div>
                )}
                <small className="text-muted">
                  Leave empty to auto-generate from content. Keep under 160
                  characters for best search results.
                </small>
              </div>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-brand-primary mx-3" onClick={handleSaveSEO}>
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowSEOModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL MESSAGE MODAL */}
      <MessageModal
        show={modal.show}
        type={modal.type}
        title={modal.title}
        message={
          redirectCountdown > 0 && modal.type === "success" ? (
            <>
              <div className="mb-2">✅ Your blog has been created successfully!</div>
              <div className="mb-2">
                Redirecting to Manage Blogs in <strong>{redirectCountdown}</strong> seconds…
              </div>
              <button
                className="btn btn-brand-primary"
                onClick={() => {
                  setRedirectCountdown(0);
                  setModal({ ...modal, show: false });
                  navigate("/bloglist");
                }}
              >
                Go now
              </button>
            </>
          ) : (
            modal.message
          )
        }
        onClose={() => setModal({ ...modal, show: false })}
      />

      {imgModal.open && (
        <div className="modal-overlay" onClick={() => setImgModal({ open: false, src: "" })}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "900px" }}
          >
            <div className="modal-header">
              <h5 className="modal-title">Image preview</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setImgModal({ open: false, src: "" })}
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={imgModal.src}
                alt="preview"
                style={{ width: "100%", height: "auto", borderRadius: 8 }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setImgModal({ open: false, src: "" })}>
                Close
              </button>
              <a className="btn btn-brand-primary" href={imgModal.src} target="_blank" rel="noreferrer">
                Open in new tab
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM LEAVE MODAL */}
      <ConfirmLeaveModal
        show={confirmLeave.show}
        onStay={stayOnPage}
        onLeave={leavePage}
      />
    </>
  );
}

export default BlogEditor;