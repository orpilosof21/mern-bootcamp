import { HttpError } from "../models/http-error";
import { Request, Response, NextFunction } from "express";
import {
  FilterByProp,
  FindByProp,
  GetCopyByProp,
  GetIndexById,
  RemoveById,
} from "./utils";
import { v4 as uuid_v4 } from "uuid";

let DUMMY_PLACES: IPlaceData[] = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

export interface IPlaceData {
  id?: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  creator: string;
}

type IPlaceUpdateData = Omit<IPlaceData, "location" | "address" | "creator">;

//#region GET
export function getPlaceById(req: Request, res: Response, next: NextFunction) {
  const placeId = req.params.pid;
  const place = FindByProp(DUMMY_PLACES, placeId, "id");
  if (!place) {
    const err = new HttpError(
      "Could not find a place for the provided place id.",
      404
    );
    return next(err);
  }

  res.json({ place });
}

export function getPlacesByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.uid;
  const places = FilterByProp(DUMMY_PLACES, userId, "creator");
  if (!places || places.length === 0) {
    const err = new HttpError(
      "Could not find a place for the provided user id.",
      404
    );
    return next(err);
  }

  res.json({ places: places });
}
//#endregion

//#region  POST
export function createPlace(req: Request, res: Response, next: NextFunction) {
  const { ...createdPlace }: IPlaceData = req.body;
  DUMMY_PLACES.push({ id: uuid_v4().toString(), ...createdPlace });
  res.status(201).json({ place: { id: uuid_v4(), ...createdPlace } });
}
//#endregion

//#region PATCH
export function updatePlaceById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { ...reqData }: IPlaceUpdateData = req.body;
  const placeId = req.params.pid;
  let updatePlace: IPlaceData = GetCopyByProp(DUMMY_PLACES, placeId, "id");
  const placeIndex = GetIndexById(DUMMY_PLACES, placeId);

  updatePlace = { ...updatePlace, ...reqData };
  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ place: updatePlace });
}
//#endregion

//#region DELETE
export function removePlaceById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const placeId = req.params.pid;
  DUMMY_PLACES = RemoveById(DUMMY_PLACES, placeId);
  res.status(200).json({ message: "Delete place." });
}
//#endregion
