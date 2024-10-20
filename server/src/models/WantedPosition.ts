import mongoose from "mongoose";

const wantedPositionSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true
    }
})

export default mongoose.model("WantedPosition", wantedPositionSchema);