import mongoose, { Schema } from "mongoose";
import { IUserData } from "../controllers/users-controller";
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true, minlength:6},
    image: {type: String, required: true},
    places: {type: String, required: true},
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model<IUserData>('User',userSchema);
export default User;