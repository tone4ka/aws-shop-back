import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


const products= async () => {
  return formatJSONResponse({
    message: 'Hello',
    products: [
      {
        description: "Short Product Description1",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        imageUrl: "https://st.depositphotos.com/2072731/2179/i/600/depositphotos_21795325-stock-photo-seascape-view.jpg",
        price: 24,
        title: "Hawaii",
      },
      {
        description: "Short Product Description7",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
        price: 15,
        title: "France",
        imageUrl: "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
      },
      {
        description: "Short Product Description2",
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
        price: 23,
        title: "Venice",
        imageUrl: "https://www.tripsavvy.com/thmb/zA9mU4KpC7Yxn5EAa6zHDif7VVQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gondolier-heads-into-the-sunset-along-venice-s-grand-canal--sunset--1062428612-261501b5a5f44ffc95f012f908750ad4.jpg",
      },
      {
        description: "Short Product Description4",
        id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
        price: 15,
        title: "Spain",
        imageUrl: "https://cdn.kimkim.com/files/a/content_articles/featured_photos/736090c81de0f571ace574f5dd96640611b04626/big-523b3fd584afb6a873ff1fe57f4d9f58.jpg"
      },
      {
        description: "Short Product Descriptio1",
        id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
        price: 23,
        title: "Greece",
        imageUrl: "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/408000/408512-Greece.jpg"
      },
      {
        description: "Short Product Description7",
        id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
        price: 15,
        title: "Egypt",
        imageUrl: "https://www.planetware.com/photos-large/EGY/egypt-cairo-pyramids-of-giza.jpg"
      },
    ],
  });
};

export const main = middyfy(products);
