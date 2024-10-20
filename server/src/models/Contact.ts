import mongoose from "mongoose";

const contactTypes = ["email", "phone", "web"];

const ContactSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: contactTypes,
    },
    value: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Contact", ContactSchema);