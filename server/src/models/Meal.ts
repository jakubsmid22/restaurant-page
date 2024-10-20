import mongoose from "mongoose";

const types = ["main", "soup", "starter", "dessert", "bread"];

const MealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  grammage: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  alergens: {
    type: [Number],
    required: false,
  },
  type: {
    type: String,
    required: true,
    enum: types,
  },
});

export default mongoose.model("Meal", MealSchema);
