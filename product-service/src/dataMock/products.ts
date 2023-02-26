export type Product = {
  description: string;
  id: string;
  imageUrl: string;
  price: number;
  title: string;
};

export async function getProducts(): Promise<Product[]> {
  const res: Product[] = await new Promise((resolve) => {
    return resolve(products);
  });

  return res;
}

export async function getProduct(id: string): Promise<Product> {
  const res: Product = await new Promise((resolve) => {
    const product: Product = products.find((item) => item.id === id);
    return resolve(product);
  });

  return res;
}

export const products: Product[] = [
  {
    description: "Short Product Description111",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80bb",
    imageUrl:
      "https://planetofhotels.com/guide/sites/default/files/styles/paragraph__text_with_image___twi_image/public/2022-05/The-Statue-of-Liberty-3.jpg",
    price: 23,
    title: "New York",
  },
  {
    description: "Short Product Description123",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80cc",
    imageUrl:
      "https://pacificimmigration.ca/ru/wp-content/uploads/2017/01/2.jpg",
    price: 20,
    title: "Vancouver",
  },
  {
    description: "Short Product Description1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    imageUrl:
      "https://st.depositphotos.com/2072731/2179/i/600/depositphotos_21795325-stock-photo-seascape-view.jpg",
    price: 24,
    title: "Hawaii",
  },
  {
    description: "Short Product Description7",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    title: "France",
    imageUrl:
      "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
  },
  {
    description: "Short Product Description2",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    title: "Venice",
    imageUrl:
      "https://www.tripsavvy.com/thmb/zA9mU4KpC7Yxn5EAa6zHDif7VVQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gondolier-heads-into-the-sunset-along-venice-s-grand-canal--sunset--1062428612-261501b5a5f44ffc95f012f908750ad4.jpg",
  },
  {
    description: "Short Product Description4",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 16,
    title: "Spain",
    imageUrl:
      "https://cdn.kimkim.com/files/a/content_articles/featured_photos/736090c81de0f571ace574f5dd96640611b04626/big-523b3fd584afb6a873ff1fe57f4d9f58.jpg",
  },
  {
    description: "Short Product Descriptio1",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    title: "Greece",
    imageUrl:
      "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/408000/408512-Greece.jpg",
  },
  {
    description: "Short Product Description7",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    title: "Egypt",
    imageUrl:
      "https://www.planetware.com/photos-large/EGY/egypt-cairo-pyramids-of-giza.jpg",
  },
  {
    description: "Short Product Description1234",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80cc",
    imageUrl:
      "https://planetofhotels.com/guide/sites/default/files/styles/big_gallery_image/public/text_gallery/Los%20Angeles_6.jpg",
    price: 21,
    title: "Los Angeles",
  },
  {
    description: "Short Product Description71",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80dd",
    price: 21,
    title: "Japan",
    imageUrl:
      "https://img1.akspic.ru/crops/9/6/7/7/87769/87769-zavod-gora-dostoprimechatelnost-pejzazhi_gor-kitajskaya_arhitektura-3840x2160.jpg",
  },
  {
    description: "Short Product Description72",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80ff",
    price: 20,
    title: "India",
    imageUrl:
      "https://kartinkin.net/uploads/posts/2022-02/thumbs/1645448729_35-kartinkin-net-p-indiya-kartinki-41.jpg",
  },
  {
    description: "Short Product Description723",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80fd",
    price: 20,
    title: "Switzerland",
    imageUrl:
      "https://sportishka.com/uploads/posts/2022-03/1646207932_1-sportishka-com-p-tsermatt-turizm-krasivo-foto-1.jpg",
  },
];
