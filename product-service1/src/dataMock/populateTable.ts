import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
});

type Product = {
  description: string;
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  count: number;
};

async function addProducts(productsList: Omit<Product, "id">[]): Promise<void> {
  await Promise.all(productsList.map(async (product) => addProduct(product)));
}

async function addProduct(product: Omit<Product, "id">) {
  const id = uuidv4();
  await Promise.all([
    dynamo.send(
      new PutCommand({
        TableName: "Products1",
        Item: {
          id: id,
          title: product.title || "Untitled",
          description:
            product.description ||
            "Description will be added as soon as possible, sorry for the inconvenience",
          price: product.price || 0,
          imageUrl: product.imageUrl || "",
        },
      })
    ),
    dynamo.send(
      new PutCommand({
        TableName: "Stock",
        Item: {
          id: id,
          count: product.count,
        },
      })
    ),
  ]);
}

addProducts([
  {
    description: "Short Product Description111",
    imageUrl:
      "https://planetofhotels.com/guide/sites/default/files/styles/paragraph__text_with_image___twi_image/public/2022-05/The-Statue-of-Liberty-3.jpg",
    price: 23,
    title: "New York",
    count: 10,
  },
  {
    description: "Short Product Description123",
    imageUrl:
      "https://pacificimmigration.ca/ru/wp-content/uploads/2017/01/2.jpg",
    price: 20,
    title: "Vancouver",
    count: 11,
  },
  {
    description: "Short Product Description1",
    imageUrl:
      "https://st.depositphotos.com/2072731/2179/i/600/depositphotos_21795325-stock-photo-seascape-view.jpg",
    price: 24,
    title: "Hawaii",
    count: 12,
  },
  {
    description: "Short Product Description7",
    price: 15,
    title: "France",
    imageUrl:
      "https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
    count: 13,
  },
  {
    description: "Short Product Description2",
    price: 23,
    title: "Venice",
    count: 14,
    imageUrl:
      "https://www.tripsavvy.com/thmb/zA9mU4KpC7Yxn5EAa6zHDif7VVQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/gondolier-heads-into-the-sunset-along-venice-s-grand-canal--sunset--1062428612-261501b5a5f44ffc95f012f908750ad4.jpg",
  },
  {
    description: "Short Product Description4",
    price: 16,
    title: "Spain",
    count: 15,
    imageUrl:
      "https://cdn.kimkim.com/files/a/content_articles/featured_photos/736090c81de0f571ace574f5dd96640611b04626/big-523b3fd584afb6a873ff1fe57f4d9f58.jpg",
  },
  {
    description: "Short Product Descriptio1",
    price: 23,
    title: "Greece",
    count: 10,
    imageUrl:
      "https://a.travel-assets.com/findyours-php/viewfinder/images/res70/408000/408512-Greece.jpg",
  },
  {
    description: "Short Product Description7",
    price: 15,
    title: "Egypt",
    count: 15,
    imageUrl:
      "https://www.planetware.com/photos-large/EGY/egypt-cairo-pyramids-of-giza.jpg",
  },
  {
    description: "Short Product Description1234",
    count: 16,
    imageUrl:
      "https://planetofhotels.com/guide/sites/default/files/styles/big_gallery_image/public/text_gallery/Los%20Angeles_6.jpg",
    price: 21,
    title: "Los Angeles",
  },
  {
    description: "Short Product Description71",
    price: 21,
    count: 17,
    title: "Japan",
    imageUrl:
      "https://img1.akspic.ru/crops/9/6/7/7/87769/87769-zavod-gora-dostoprimechatelnost-pejzazhi_gor-kitajskaya_arhitektura-3840x2160.jpg",
  },
  {
    description: "Short Product Description72",
    price: 20,
    count: 18,
    title: "India",
    imageUrl:
      "https://kartinkin.net/uploads/posts/2022-02/thumbs/1645448729_35-kartinkin-net-p-indiya-kartinki-41.jpg",
  },
  {
    description: "Short Product Description723",
    price: 20,
    count: 12,
    title: "Switzerland",
    imageUrl:
      "https://sportishka.com/uploads/posts/2022-03/1646207932_1-sportishka-com-p-tsermatt-turizm-krasivo-foto-1.jpg",
  },
]).catch;
