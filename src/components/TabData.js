const generateImages = (folder, prefix, count, displayName) => {
  return Array.from({ length: count }, (_, i) => ({
    src: require(`../assets/products/${folder}/${prefix} (${i + 1}).jpg`),
    name: `${displayName}`,
  }));
};

const tabData = [
  {
    key: "sarees",
    title: "Sarees",
    viewMoreLink: "/products",
    images: [
        ...generateImages("saree/bollywood", "bollywood_five", 2, "Bollywood Collection"),
        ...generateImages("saree/deepika", "deepika_two", 1, "Deepika Collection"),
        ...generateImages("saree/katrina", "katrina_three", 1, "Katrina Collection"),
        ...generateImages("saree/sangeet", "sangeet_two", 2, "Sangeet Collection"),
        ...generateImages("saree/sangeet 2", "sangeet_2_three", 1, "Sangeet 2 Collection"),
        ...generateImages("saree/shehnai", "shehnai_two", 2, "Shehnai Collection"),
        ...generateImages("saree/sapphire", "sapphire_three", 1, "Sapphire Collection"),
        ...generateImages("saree/sufiana", "sufiana_two", 2, "Sufiana Collection"),
        ...generateImages("saree/sunehri", "sunehri_three", 1, "Sunehri Collection"),
        ...generateImages("saree/shehnai 2", "shehnai_2_two", 2, "Shehnai 2 Collection"),
    ],
  },
  {
    key: "lehengas",
    title: "Lehengas",
    viewMoreLink: "/products",
    images: [
      ...generateImages("lehenga/ranisahiba", "ranisahiba_one", 2, "Ranisahiba Collection"),
      ...generateImages("lehenga/anamika", "anamika_two", 2, "Anamika Collection"),
      ...generateImages("lehenga/vrinda", "vrinda_three", 5, "Vrinda Collection"),
      ...generateImages("lehenga/vrinda 2", "vrinda_2_two", 2, "Vrinda 2 Collection"),
    ],
  },
  {
    key: "readymade",
    title: "Readymade",
    viewMoreLink: "/products",
    images: [
        ...generateImages("readymade/celebration", "celeb_one", 2, "Celebration Collection"),
        ...generateImages("readymade/preet", "preet_two", 1, "Preet Collection"),
        ...generateImages("readymade/myra", "myra_three", 2, "Myra Collection"),
        ...generateImages("readymade/geetika", "geetika_four", 1, "Geetika Collection"),
    ],
  },
];

export default tabData;