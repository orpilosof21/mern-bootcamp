import { HttpError } from "../models/http-error";
import { Request, Response, NextFunction } from "express";
import { inputErrorCheck } from "./controllerUtils";
import { validationResult } from "express-validator";
import User from "../models/user";


export interface IUserData {
  id?: string;
  name: string;
  email: string;
  password: string;
}

type IUserLoginData = Omit<IUserData, "id" | "name">;

//#region GET
export async function getUsersList(req: Request, res: Response, next: NextFunction) {
  try{
  const users = await User.find({}, '-password');
  res.status(200).json({ users: users.map(u => u.toJSON({getters:true})) });
  }
  catch (err){
    return next(new HttpError("Fetching users failed", 500));
  }
}
//#endregion

//#region  POST
export async function signup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  inputErrorCheck(errors);
  const { ...reqData }: IUserData = req.body;
  let identifiedUser;

  try{
  identifiedUser = await User.findOne({email: reqData.email});
  }
  catch (err){
    return next(new HttpError('Something went wrong',500));
  }

  if (identifiedUser) {
    return next(new HttpError("Could not create user, email already in use.", 422));
  }

  const createdUser = new User({
    ...reqData,
    image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  })

  try{
   await createdUser.save();
    }
    catch (err){
      return next(new HttpError('Something went wrong',500));
    }

  res.status(201).json({ user: createdUser.toObject({getters:true}) });
}

export async function logInUser(req: Request, res: Response, next: NextFunction) {
  const { ...reqData }: IUserLoginData = req.body;
  let identifiedUser;
  try{
   identifiedUser= await User.findOne({email: reqData.email});
  }
  catch(err){
    return next(new HttpError('Log in failed',500));
  }
  if (!identifiedUser || identifiedUser.password !== reqData.password) {
    return next(new HttpError("Could not login user", 401));
  }

  res.json({ message: "Logged in!"});
}
//#endregion
