import { HttpError } from "../models/http-error";
import { Request, Response, NextFunction } from "express";
import {
  FilterByProp,
  FindByProp,
  GetCopyByProp,
  GetIndexById,
  inputErrorCheck,
  RemoveById,
} from "./controllerUtils";
import { v4 as uuid_v4 } from "uuid";
import { validationResult } from "express-validator";
import { getLoactionForAddress } from "../util/location";
import moongoose from 'mongoose';
import Place from "../models/place";




export interface IPlaceData {
  id?: string;
  title: string;
  description: string;
  location?: {
    lat: number;
    lng: number;
  };
  address: string;
  creator: string;
  image?: string;
}

type IPlaceUpdateData = Omit<IPlaceData, "location" | "address" | "creator">;


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
    image:'',
  },
];
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
export async function createPlace(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  inputErrorCheck(errors, next);
  const { ...createdPlaceData }: IPlaceData = req.body;

  let coordinates;
  if (!createdPlaceData.location) {
    try {
      coordinates = await getLoactionForAddress(createdPlaceData.address);
      createdPlaceData.location = coordinates;
    } catch (error: unknown) {
      return next(error);
    }
  }
  const createdPlace = new Place({
    ...createdPlaceData,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
  });
  
  try {
    await createdPlace.save();
  } catch (err) {
    console.log(err);
    return next(new HttpError(
      'Creating place failed, please try again.',
      500
    ));
  }
  
  res.status(201).json({ place: createdPlace });
};


//#endregion

//#region PATCH
export function updatePlaceById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  inputErrorCheck(errors);
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
  if (!FindByProp(DUMMY_PLACES, placeId, "id")) {
    throw new HttpError("Could not find a place for that id", 404);
  }
  DUMMY_PLACES = RemoveById(DUMMY_PLACES, placeId) as IPlaceData[];
  res.status(200).json({ message: "Delete place." });
}
//#endregion
