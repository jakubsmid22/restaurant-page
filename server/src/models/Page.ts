import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  section1Title: {
    type: String,
    required: false,
  },
  section2Title: {
    type: String,
    required: false,
  },
  section3Title: {
    type: String,
    required: false,
  },
  section4Title: {
    type: String,
    required: false,
  },
  section5Title: {
    type: String,
    required: false,
  },
  section1Link: {
    type: String,
    required: false,
  },
  section3Link: {
    type: String,
    required: false,
  },
  section4Link: {
    type: String,
    required: false,
  },
  section5Link: {
    type: String,
    required: false,
  },
  section2Content: {
    type: String,
    required: false,
  },
  section3Content: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Page", PageSchema);
