// helper function
const generateImages = (collection, folder, count) => {
  return Array.from({ length: count }, (_, i) => ({
    src: require(`../assets/products/${folder} (${i + 1}).jpg`),
    label: `${collection} ${i + 1}`,
  }));
};

const productData = [
  // ================= Saree =================
  {
    key: "saree",
    title: "Saree",
    subcollections: [
      {
        key: "bollywood",
        title: "Collection Bollywood",
        images: []
          .concat(generateImages("Bollywood One", "saree/bollywood/bollywood_one", 5))
          .concat(generateImages("Bollywood Two", "saree/bollywood/bollywood_two", 5))
          .concat(generateImages("Bollywood Three", "saree/bollywood/bollywood_three", 5))
          .concat(generateImages("Bollywood Four", "saree/bollywood/bollywood_four", 5))
          .concat(generateImages("Bollywood Five", "saree/bollywood/bollywood_five", 5))
          .concat(generateImages("Bollywood Six", "saree/bollywood/bollywood_six", 5)),
      },
      {
        key: "deepika",
        title: "Collection Deepika",
        images: []
          .concat(generateImages("Deepika One", "saree/deepika/deepika_one", 5))
          .concat(generateImages("Deepika Two", "saree/deepika/deepika_two", 5))
          .concat(generateImages("Deepika Three", "saree/deepika/deepika_three", 5))
          .concat(generateImages("Deepika Four", "saree/deepika/deepika_four", 5)),
      },
      {
        key: "katrina",
        title: "Collection Katrina",
        images: []
          .concat(generateImages("Katrina One", "saree/katrina/katrina_one", 5))
          .concat(generateImages("Katrina Two", "saree/katrina/katrina_two", 5))
          .concat(generateImages("Katrina Three", "saree/katrina/katrina_three", 5))
          .concat(generateImages("Katrina Four", "saree/katrina/katrina_four", 5)),
      },
      {
        key: "sangeet",
        title: "Collection Sangeet",
        images: []
          .concat(generateImages("Sangeet One", "saree/sangeet/sangeet_one", 5))
          .concat(generateImages("Sangeet Two", "saree/sangeet/sangeet_two", 6))
          .concat(generateImages("Sangeet Three", "saree/sangeet/sangeet_three", 5))
          .concat(generateImages("Sangeet Four", "saree/sangeet/sangeet_four", 5)),
      },
      {
        key: "sangeet 2",
        title: "Collection Sangeet 2",
        images: []
          .concat(generateImages("Sangeet 2 One", "saree/sangeet 2/sangeet_2_one", 5))
          .concat(generateImages("Sangeet 2 Two", "saree/sangeet 2/sangeet_2_two", 6))
          .concat(generateImages("Sangeet 2 Three", "saree/sangeet 2/sangeet_2_three", 5))
          .concat(generateImages("Sangeet 2 Four", "saree/sangeet 2/sangeet_2_four", 5))
          .concat(generateImages("Sangeet 2 Five", "saree/sangeet 2/sangeet_2_five", 5))
          .concat(generateImages("Sangeet 2 Six", "saree/sangeet 2/sangeet_2_six", 5)),
      },
      {
        key: "sapphire",
        title: "Collection Sapphire",
        images: []
        .concat(generateImages("Sapphire One", "saree/sapphire/sapphire_one", 6))
        .concat(generateImages("Sapphire Two", "saree/sapphire/sapphire_two", 6))
        .concat(generateImages("Sapphire Three", "saree/sapphire/sapphire_three", 6))
        .concat(generateImages("Sapphire Four", "saree/sapphire/sapphire_four", 6))
        .concat(generateImages("Sapphire Five", "saree/sapphire/sapphire_five", 6))
        .concat(generateImages("Sapphire Six", "saree/sapphire/sapphire_six", 6)),
      },
      {
        key: "shehnai",
        title: "Collection Shehnai",
        images: []
          .concat(generateImages("Shehnai One", "saree/shehnai/shehnai_one", 5))
          .concat(generateImages("Shehnai Two", "saree/shehnai/shehnai_two", 5))
          .concat(generateImages("Shehnai Three", "saree/shehnai/shehnai_three", 5))
          .concat(generateImages("Shehnai Four", "saree/shehnai/shehnai_four", 5))
          .concat(generateImages("Shehnai Five", "saree/shehnai/shehnai_five", 5)),
      },
      {
        key: "shehnai 2",
        title: "Collection Shehnai 2",
        images: []
          .concat(generateImages("Shehnai 2 One", "saree/shehnai 2/shehnai_2_one", 5))
          .concat(generateImages("Shehnai 2 Two", "saree/shehnai 2/shehnai_2_two", 5))
          .concat(generateImages("Shehnai 2 Three", "saree/shehnai 2/shehnai_2_three", 5))
          .concat(generateImages("Shehnai 2 Four", "saree/shehnai 2/shehnai_2_four", 5))
          .concat(generateImages("Shehnai 2 Five", "saree/shehnai 2/shehnai_2_five", 5)),
      },
      {
        key: "sufiana",
        title: "Collection Sufiana",
        images: []
          .concat(generateImages("Sufiana One", "saree/sufiana/sufiana_one", 5))
          .concat(generateImages("Sufiana Two", "saree/sufiana/sufiana_two", 5))
          .concat(generateImages("Sufiana Three", "saree/sufiana/sufiana_three", 5))
          .concat(generateImages("Sufiana Four", "saree/sufiana/sufiana_four", 5))
          .concat(generateImages("Sufiana Five", "saree/sufiana/sufiana_five", 5)),
      },
      {
        key: "sunehri",
        title: "Collection Sunehri",
        images: []
          .concat(generateImages("Sunehri One", "saree/sunehri/sunehri_one", 5))
          .concat(generateImages("Sunehri Two", "saree/sunehri/sunehri_two", 5))
          .concat(generateImages("Sunehri Three", "saree/sunehri/sunehri_three", 5))
          .concat(generateImages("Sunehri Four", "saree/sunehri/sunehri_four", 5))
          .concat(generateImages("Sunehri Five", "saree/sunehri/sunehri_five", 5)),
      },
    ],
  },

  // ================= Lehenga =================
  {
    key: "lehenga",
    title: "Lehenga",
    subcollections: [
      {
        key: "anamika",
        title: "Collection Anamika",
        images: []
          .concat(generateImages("Anamika One", "lehenga/anamika/anamika_one", 5))
          .concat(generateImages("Anamika Two", "lehenga/anamika/anamika_two", 5))
          .concat(generateImages("Anamika Three", "lehenga/anamika/anamika_three", 5))
          .concat(generateImages("Anamika Four", "lehenga/anamika/anamika_four", 5))
          .concat(generateImages("Anamika Five", "lehenga/anamika/anamika_five", 5)),
      },
      {
        key: "vrinda",
        title: "Collection Vrinda",
        images: []
          .concat(generateImages("Vrinda One", "lehenga/vrinda/vrinda_one", 5))
          .concat(generateImages("Vrinda Two", "lehenga/vrinda/vrinda_two", 5))
          .concat(generateImages("Vrinda Three", "lehenga/vrinda/vrinda_three", 3))
          .concat(generateImages("Vrinda Four", "lehenga/vrinda/vrinda_four", 3))
          .concat(generateImages("Vrinda Five", "lehenga/vrinda/vrinda_five", 3)),
      },
      {
        key: "vrinda 2",
        title: "Collection Vrinda 2",
        images: []
          .concat(generateImages("Vrinda 2 One", "lehenga/vrinda 2/vrinda_2_one", 5))
          .concat(generateImages("Vrinda 2 Two", "lehenga/vrinda 2/vrinda_2_two", 5))
          .concat(generateImages("Vrinda 2 Three", "lehenga/vrinda 2/vrinda_2_three", 5)),
      },
      {
        key: "ranisahiba",
        title: "Collection Ranisahiba",
        images: []
          .concat(generateImages("Ranisahiba One", "lehenga/ranisahiba/ranisahiba_one", 5))
          .concat(generateImages("Ranisahiba Two", "lehenga/ranisahiba/ranisahiba_two", 5))
          .concat(generateImages("Ranisahiba Three", "lehenga/ranisahiba/ranisahiba_three", 5))
          .concat(generateImages("Ranisahiba Four", "lehenga/ranisahiba/ranisahiba_four", 5)),
      },
    ],
  },

  // ================= Readymade =================
  {
    key: "readymade",
    title: "Readymade",
    subcollections: [
      {
        key: "celebration",
        title: "Collection Celebration",
        images: []
        .concat(generateImages("Celebration", "readymade/celebration/celeb_one", 5))
        .concat(generateImages("Celebration", "readymade/celebration/celeb_two", 5))
        .concat(generateImages("Celebration", "readymade/celebration/celeb_three", 5))
        .concat(generateImages("Celebration", "readymade/celebration/celeb_four", 5)) 
      },
      {
        key: "geetika",
        title: "Collection Geetika",
        images: []
        .concat(generateImages("Geetika", "readymade/geetika/geetika_one", 5))
        .concat(generateImages("Geetika", "readymade/geetika/geetika_two", 5))
        .concat(generateImages("Geetika", "readymade/geetika/geetika_three", 5))
        .concat(generateImages("Geetika", "readymade/geetika/geetika_four", 5))
      },
      {
        key: "myra",
        title: "Collection Myra",
        images: []
        .concat(generateImages("Myra", "readymade/myra/myra_one", 5))
        .concat(generateImages("Myra", "readymade/myra/myra_two", 5))
        .concat(generateImages("Myra", "readymade/myra/myra_three", 5))
        .concat(generateImages("Myra", "readymade/myra/myra_four", 5))
      },
      {
        key: "preet",
        title: "Collection Preet",
        images: []
        .concat(generateImages("Preet", "readymade/preet/preet_one", 5))
        .concat(generateImages("Preet", "readymade/preet/preet_two", 5))
        .concat(generateImages("Preet", "readymade/preet/preet_three", 5))
        .concat(generateImages("Preet", "readymade/preet/preet_four", 5))
        .concat(generateImages("Preet", "readymade/preet/preet_five", 5))
        .concat(generateImages("Preet", "readymade/preet/preet_six", 5)),
      },
    ],
  },
];

export default productData;