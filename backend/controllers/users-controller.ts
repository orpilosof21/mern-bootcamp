import { HttpError } from "../models/http-error";
import { Request, Response, NextFunction } from "express";
import { FindByProp, inputErrorCheck } from "./controllerUtils";
import { v4 as uuid_v4 } from "uuid";
import { validationResult } from "express-validator";

const DUMMY_USERS: IUserData[] = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "testers",
  },
];

export interface IUserData {
  id?: string;
  name: string;
  email: string;
  password: string;
}

type IUserLoginData = Omit<IUserData, "id" | "name">;

//#region GET
export function getUsersList(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({ users: DUMMY_USERS });
}
//#endregion

//#region  POST
export function createAndLogUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  inputErrorCheck(errors);
  const { ...reqData }: IUserData = req.body;

  const identifiedUser: IUserData = FindByProp(
    DUMMY_USERS,
    reqData.email,
    "email"
  );

  if (identifiedUser) {
    throw new HttpError("Could not create user, email already in use.", 422);
  }

  const createdUser: IUserData = {
    id: uuid_v4().toString(),
    name: reqData.name,
    email: reqData.email,
    password: reqData.password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
}

export function logInUser(req: Request, res: Response, next: NextFunction) {
  const { ...reqData }: IUserLoginData = req.body;
  const identifiedUser: IUserData = FindByProp(
    DUMMY_USERS,
    reqData.email,
    "email"
  );
  if (!identifiedUser || identifiedUser.password !== reqData.password) {
    throw new HttpError("Could not login user", 401);
  }

  res.json({ message: "Logged in!", user: identifiedUser });
}
//#endregion
