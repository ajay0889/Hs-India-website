import '../styles/Contact.css';
import SEO from './SEO';
const Contact = () => (
<>
<SEO title="Contact Us - HS India" description="Contact HS India for inquiries, support, or business opportunities. We're here to help you." />
<section className="Padding-Top">
   <div className="container">
      <div className="row">
         <div className="col-12">
            <h1 className="custom-heading">Get in Touch with HS India</h1>
            <hr className="custom-divider" />
         </div>
      </div>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6 col-12">
              <div className='ContactDetails'>
                <h5>Whether you're a retailer looking to stock our latest collection, a reseller ready to scale your business, or simply have a question — our team is here to help.</h5>
                <p className="mb-1"><strong>Phone:</strong> <a href="tel:+919210740822" className="text-Primary">+91 9210740822</a></p>
                <p className="mb-1"><strong>Email:</strong> <a href="mailto:info@hsindia.com" className="text-Primary">info@hsindia.com</a></p>
                <p className="mb-1"><strong>Address:</strong><a href="https://maps.app.goo.gl/DxSXPhin1vcJ11cC6" className='text-Primary'> Gali Kishan Dutt, 1420-21, Nai Sarak, Maliwara, Roshanpura, Chandni Chowk, New Delhi, Delhi, 110006</a></p>
                <div className="connected mt-3">Let’s Stay Connected:</div>
                <div className="hs-social mt-2">
                    <a href="https://www.instagram.com/hsindiaa/?hl=en" aria-label="Instagram" className="me-2"><i className="bi bi-instagram"></i></a>
                    <a href='https://www.facebook.com/hsindiaofficial/' aria-label='Facebook'><i className='bi bi-facebook'></i></a>
                    <a href="https://www.linkedin.com/company/hoshiyar-singh-suresh-chandra-sarees-private-limited/" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
                </div>
              </div>
          </div>
          <div className='col-md-6 col-12'>
              <form className="g-3">
                <div className="InputField">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Your Name" required />
                </div>
                <div className="InputField">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="you@email.com" required />
                </div>
                <div className="InputField">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="tel" className="form-control" id="phone" placeholder="Your Phone" />
                </div>
                <div className="InputField">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="4" placeholder="How can we help you?" required></textarea>
                </div>
                <div className="InputField my-3">
                    <button type="submit" className="btn btn-primary Primary-Button px-4 py-2">Send Message</button>
                </div>
              </form>
          </div>
         </div>
      </div>
   </div>
   <div className="mt-3 mb-0">
      <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14947372.631334731!2d67.65320799999998!3d23.844867682911705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdff160f0ffd%3A0x6b4fef469ba9c048!2sHouse%20of%20Surya!5e0!3m2!1sen!2sin!4v1750771720584!5m2!1sen!2sin"
      width="100%"
      height="500"
      style={{ border: 0,  }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="HS India Location Map"
      ></iframe>
   </div>
</section>
</>
);
export default Contact;