import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["interior", "meals", "team"]
    },
    url: {
        type: String,
        required: true
    }
});

export default mongoose.model("Image", ImageSchema);