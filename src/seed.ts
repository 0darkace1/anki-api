import mongoose from "mongoose";

import Sets from "./models/set.model";
import Cards from "./models/card.model";

export async function seedDatabase() {
  const dbSets = await Sets.find();
  const cards = await Cards.find();

  if (dbSets.length === 0) {
    console.log("Seeding Sets...");

    let count = 0;

    setsData.forEach(async (seedSet) => {
      count += 1;

      const newSet = new Sets({
        _id: new mongoose.Types.ObjectId(seedSet.id),
        title: seedSet.title,
        description: seedSet.description,
        image: seedSet.image,
        author: seedSet.author,
        private: seedSet.private,
        cards: seedSet.cards,
      });

      await newSet.save();
    });

    console.log(`${count} Sets Seeded`);
  }

  if (cards.length === 0) {
    console.log("Seeding Cards...");

    let count = 0;

    cardsCapitals.forEach(async (seedCard) => {
      count += 1;

      const newCard = new Cards({
        _id: new mongoose.Types.ObjectId(),
        question: seedCard.question,
        answer: seedCard.answer,
        set: seedCard.set,
      });

      await newCard.save();
    });

    cardsProgramming.forEach(async (seedCard) => {
      count += 1;

      const newCard = new Cards({
        _id: new mongoose.Types.ObjectId(),
        question: seedCard.question,
        answer: seedCard.answer,
        set: seedCard.set,
      });

      await newCard.save();
    });

    cardsFamousLandmarks.forEach(async (seedCard) => {
      count += 1;

      const newCard = new Cards({
        _id: new mongoose.Types.ObjectId(),
        question: seedCard.question,
        answer: seedCard.answer,
        set: seedCard.set,
      });

      await newCard.save();
    });

    cardsArtHistory.forEach(async (seedCard) => {
      count += 1;

      const newCard = new Cards({
        _id: new mongoose.Types.ObjectId(),
        question: seedCard.question,
        answer: seedCard.answer,
        set: seedCard.set,
      });

      await newCard.save();
    });

    cardsAnimalKingdom.forEach(async (seedCard) => {
      count += 1;

      const newCard = new Cards({
        _id: new mongoose.Types.ObjectId(),
        question: seedCard.question,
        answer: seedCard.answer,
        set: seedCard.set,
      });

      await newCard.save();
    });

    console.log(`${count} Cards Seeded`);
  }
}

export const setsData = [
  {
    id: "65971bf211b1482496d19395",
    title: "Apprenez les capitales",
    description: "Apprenez les capitales du monde avec cet ensemble !",
    image:
      "https://cdn.firstcry.com/education/2022/11/30100511/Countries-And-Their-Capitals-For-Kids.jpg",
    author: "Admin",
    private: false,
    cards: 10,
  },
  {
    id: "65971bf211b1482496d19397",
    title: "Apprenez les langages de programmation",
    description: "Apprenez tous les langages de programmation et acronymes !",
    image:
      "https://www.shutterstock.com/image-vector/vector-image-programming-language-logos-600w-2370541651.jpg",
    author: "Admin",
    private: false,
    cards: 10,
  },
  {
    id: "65971bf211b1482496d19398",
    title: "Sites célèbres",
    description: "Explorez les sites célèbres du monde et leurs emplacements !",
    image:
      "https://www.usnews.com/object/image/00000169-5e07-df95-a57d-7ec70b790000/19030830famouslandmarks-stock.jpg?update-time=1552318747438&size=responsive640",
    author: "Admin",
    private: false,
    cards: 10,
  },
  {
    id: "65971bf211b1482496d19399",
    title: "Histoire de l'art",
    description:
      "Découvrez les œuvres d'art renommées et leurs créateurs à travers l'histoire !",
    image:
      "https://s.studiobinder.com/wp-content/uploads/2020/12/Art-History-Timeline-A-Guide-to-Western-Art-Movements-Featured.jpg",
    author: "Admin",
    private: false,
    cards: 10,
  },
  {
    id: "65971bf211b1482496d19400",
    title: "Royaume animal",
    description: "Apprenez sur les différentes espèces du monde entier !",
    image:
      "https://images.photowall.com/products/48086/jungle-lake-with-wild-animals-1.jpg?h=699&q=85",
    author: "Admin",
    private: false,
    cards: 10,
  },
];

export const cardsCapitals = [
  {
    question: "Dans quel pays se trouve la ville de Tokyo ?",
    answer: "Japon",
    set: "65971bf211b1482496d19395",
  },
  {
    question: "Dans quel pays se trouve la ville de Paris ?",
    answer: "France",
    set: "65971bf211b1482496d19395",
  },
  {
    question: "Dans quel pays se trouve la ville de Nairobi ?",
    answer: "Kenya",
    set: "65971bf211b1482496d19395",
  },
  {
    question: "Dans quel pays se trouve la ville de Sydney ?",
    answer: "Australie",
    set: "65971bf211b1482496d19395",
  },
  {
    question: "Dans quel pays se trouve la ville de Rio de Janeiro ?",
    answer: "Brésil",
    set: "65971bf211b1482496d19395",
  },
  {
    question: "Dans quel pays se trouve la ville du Caire ?",
    answer: "Égypte",
    set: "65971bf211b1482496d19395",
  },
  {
    question: "Dans quel pays se trouve la ville de Moscou ?",
    answer: "Russie",
    set: "65971bf211b1482496d19395",
  },
  {
    question: "Dans quel pays se trouve la ville de Toronto ?",
    answer: "Canada",
    set: "65971bf211b1482496d19395",
  },
  {
    question: "Dans quel pays se trouve la ville de Lima ?",
    answer: "Pérou",
    set: "65971bf211b1482496d19395",
  },
  {
    question: "Dans quel pays se trouve la ville de Beijing ?",
    answer: "Chine",
    set: "65971bf211b1482496d19395",
  },
];

export const cardsProgramming = [
  {
    question:
      "Quel langage de programmation est connu pour son utilisation dans le développement web et possède un framework populaire appelé 'Express.js' ?",
    answer: "JavaScript (Node.js)",
    set: "65971bf211b1482496d19397",
  },
  {
    question:
      "Quel langage est connu pour son modèle de concurrence et ses canaux ?",
    answer: "Go (ou Golang)",
    set: "65971bf211b1482496d19397",
  },
  {
    question:
      "Quel langage utilise le framework 'Rails' pour le développement web ?",
    answer: "Ruby",
    set: "65971bf211b1482496d19397",
  },
  {
    question: "Que signifie l'acronyme 'API' en anglais ?",
    answer: "Interface de Programmation d'Application",
    set: "65971bf211b1482496d19397",
  },
  {
    question:
      "Quel langage de programmation est souvent associé au calcul scientifique, à l'analyse de données et à l'apprentissage automatique ?",
    answer: "Python",
    set: "65971bf211b1482496d19397",
  },
  {
    question: "Que signifie l'acronyme 'SQL' en anglais ?",
    answer: "Langage de Requête Structurée",
    set: "65971bf211b1482496d19397",
  },
  {
    question: "Quel langage de programmation a pour mascotte 'Camel' ?",
    answer: "Perl",
    set: "65971bf211b1482496d19397",
  },
  {
    question:
      "Que signifie l'acronyme 'IDE' en anglais dans le développement logiciel ?",
    answer: "Environnement de Développement Intégré",
    set: "65971bf211b1482496d19397",
  },
  {
    question:
      "Quel langage a été principalement développé par Microsoft et est connu pour son framework '.NET' ?",
    answer: "C#",
    set: "65971bf211b1482496d19397",
  },
  {
    question: "Que signifie l'acronyme 'OOP' en programmation ?",
    answer: "Programmation Orientée Objet",
    set: "65971bf211b1482496d19397",
  },
];

export const cardsFamousLandmarks = [
  {
    question:
      "Quel monument est situé à Agra, en Inde, et est connu pour son mausolée en marbre blanc ?",
    answer: "Taj Mahal",
    set: "65971bf211b1482496d19398",
  },
  {
    question:
      "Quel est le célèbre amphithéâtre antique situé à Rome, en Italie ?",
    answer: "Colisée",
    set: "65971bf211b1482496d19398",
  },
  {
    question: "Dans quelle ville peut-on trouver la Tour Eiffel ?",
    answer: "Paris",
    set: "65971bf211b1482496d19398",
  },
  {
    question:
      "Quel monument en Égypte est un énorme monument en pierre avec un corps de lion et une tête humaine ?",
    answer: "Grand Sphinx de Gizeh",
    set: "65971bf211b1482496d19398",
  },
  {
    question: "Comment s'appelle la citadelle inca ancienne située au Pérou ?",
    answer: "Machu Picchu",
    set: "65971bf211b1482496d19398",
  },
  {
    question: "Quelle ville abrite le Kremlin et la Place Rouge ?",
    answer: "Moscou",
    set: "65971bf211b1482496d19398",
  },
  {
    question: "Quel est le célèbre complexe de palais à Pékin, en Chine ?",
    answer: "Cité Interdite",
    set: "65971bf211b1482496d19398",
  },
  {
    question:
      "Quel monument américain dans le Dakota du Sud présente les visages sculptés de quatre présidents américains ?",
    answer: "Mont Rushmore",
    set: "65971bf211b1482496d19398",
  },
  {
    question: "Quel est l'opéra emblématique situé à Sydney, en Australie ?",
    answer: "Opéra de Sydney",
    set: "65971bf211b1482496d19398",
  },
  {
    question:
      "Quel célèbre clocher londonien abrite la cloche connue sous le nom de Big Ben ?",
    answer: "Tour Elizabeth (Big Ben)",
    set: "65971bf211b1482496d19398",
  },
];

export const cardsArtHistory = [
  {
    question: "Qui a peint la 'Nuit étoilée' ?",
    answer: "Vincent van Gogh",
    set: "65971bf211b1482496d19399",
  },
  {
    question: "Quel artiste est connu pour sa peinture des horloges molles ?",
    answer: "Salvador Dalí",
    set: "65971bf211b1482496d19399",
  },
  {
    question: "Qui a créé la célèbre sculpture 'Le Penseur' ?",
    answer: "Auguste Rodin",
    set: "65971bf211b1482496d19399",
  },
  {
    question: "Quel artiste est associé à la peinture 'Le Cri' ?",
    answer: "Edvard Munch",
    set: "65971bf211b1482496d19399",
  },
  {
    question:
      "Qui a peint 'Guernica', représentant les horreurs de la guerre ?",
    answer: "Pablo Picasso",
    set: "65971bf211b1482496d19399",
  },
  {
    question:
      "Quel artiste de la Renaissance italienne a peint la 'Création d'Adam' ?",
    answer: "Michel-Ange",
    set: "65971bf211b1482496d19399",
  },
  {
    question:
      "Quel est le peintre néerlandais connu pour 'La Jeune Fille à la perle' ?",
    answer: "Johannes Vermeer",
    set: "65971bf211b1482496d19399",
  },
  {
    question:
      "Quel artiste est connu pour l'œuvre 'Les Boîtes de soupe Campbell' ?",
    answer: "Andy Warhol",
    set: "65971bf211b1482496d19399",
  },
  {
    question: "Qui a peint 'La Naissance de Vénus' pendant la Renaissance ?",
    answer: "Sandro Botticelli",
    set: "65971bf211b1482496d19399",
  },
  {
    question:
      "Quel artiste est célèbre pour sa série de tableaux 'Les Nymphéas' ?",
    answer: "Claude Monet",
    set: "65971bf211b1482496d19399",
  },
];

export const cardsAnimalKingdom = [
  {
    question: "Quel animal est connu comme le 'Roi de la Jungle' ?",
    answer: "Lion",
    set: "65971bf211b1482496d19400",
  },
  {
    question: "Quel oiseau est le symbole de la liberté ?",
    answer: "Aigle",
    set: "65971bf211b1482496d19400",
  },
  {
    question: "Quel est l'animal marin le plus rapide ?",
    answer: "Espadon",
    set: "65971bf211b1482496d19400",
  },
  {
    question: "Quel mammifère peut voler sans plumes ?",
    answer: "Chauve-souris",
    set: "65971bf211b1482496d19400",
  },
  {
    question: "Quel animal peut changer de couleur pour se camoufler ?",
    answer: "Caméléon",
    set: "65971bf211b1482496d19400",
  },
  {
    question: "Quel est l'animal le plus grand du monde ?",
    answer: "Girafe",
    set: "65971bf211b1482496d19400",
  },
  {
    question: "Quelle espèce d'ours est originaire de Chine ?",
    answer: "Panda Géant",
    set: "65971bf211b1482496d19400",
  },
  {
    question: "Quel est le seul mammifère capable de vol soutenu ?",
    answer: "Chauve-souris",
    set: "65971bf211b1482496d19400",
  },
  {
    question: "Quel mammifère marin est connu pour son comportement ludique ?",
    answer: "Dauphin",
    set: "65971bf211b1482496d19400",
  },
  {
    question: "Quel est le plus grand primate vivant ?",
    answer: "Gorille",
    set: "65971bf211b1482496d19400",
  },
];
