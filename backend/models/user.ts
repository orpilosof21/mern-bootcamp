import mongoose, { Schema } from "mongoose";
import { IUserData } from "../controllers/users-controller";
import uniqueValidator from 'mongoose-unique-validator';
import Place from "./place";

const userSchema:Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true, minlength:6},
    image: {type: String, required: true},
    places: [{type: mongoose.Types.ObjectId, required: true, ref: 'Place'}],
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model<IUserData>('User',userSchema);
export default User;