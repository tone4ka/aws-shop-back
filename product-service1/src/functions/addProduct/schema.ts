export default {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    price: { type: "integer" },
    imageUrl: { type: "string" },
    count: { type: "integer" },
  },
  required: ["title", "description", "price"],
} as const;
