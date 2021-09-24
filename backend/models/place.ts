import mongoose, { Schema } from "mongoose";
import { IPlaceData } from "../controllers/places-controller";

const placeSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    address: {type: String, required: true},
    location: {
      lat: {type: Number, required: true},
      lng: {type: Number, required: true},
    },
    creator: {type: String, required: true}
});

const Place = mongoose.model<IPlaceData>('Place',placeSchema);
export default Place;