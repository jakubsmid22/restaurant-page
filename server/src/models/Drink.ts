import mongoose from "mongoose";

const types = [
  "soft",
  "lemonade",
  "beer",
  "coffee",
  "hot drink",
  "rum",
  "whiskey",
  "cognac",
  "liqueur",
  "spirit",
  "mixed drink",
];

const DrinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: false,
  },
  type: {
    type: String,
    required: true,
    enum: types,
  },
  image: {
    type: String,
    required: false,
  }
});

export default mongoose.model("Drink", DrinkSchema);
