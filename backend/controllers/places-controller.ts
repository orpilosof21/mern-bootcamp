import { HttpError } from "../models/http-error";
import { Request, Response, NextFunction } from "express";
import {
  inputErrorCheck,
} from "./controllerUtils";
import { validationResult } from "express-validator";
import { getLoactionForAddress } from "../util/location";
import Place from "../models/place";




export interface IPlaceData {
  id?: string;
  title: string;
  description?: string;
  location?: {
    lat: number;
    lng: number;
  };
  address: string;
  creator: string;
  image?: string;
}

type IPlaceUpdateData = Omit<IPlaceData, "location" | "address" | "creator">;


//#region GET
export async function getPlaceById(req: Request, res: Response, next: NextFunction) {
  const placeId = req.params.pid;
  let place;

  try{
     
    place = await Place.findById(placeId);

  }
  catch(error){
    return next(new HttpError('Something went wrong',500));
  }

  if (!place) {
    return next(new HttpError(
      "Could not find a place for the provided place id.",
      404
    ));
  }

  res.json({ place: place.toObject({getters: true}) });
}

export async function  getPlacesByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.uid;
  let places;

  try{
    places = await Place.find({creator: userId});

  }
  catch(error){
    return next(new HttpError(
      "Fetching places failed.",
      500
    ));
  }
  if (!places || places.length === 0) {
    return next(new HttpError(
      "Could not find a place for the provided user id.",
      404
    ));
  }

  res.json({ places: places.map(p => p.toObject({getters:true})) });
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
export async function updatePlaceById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  inputErrorCheck(errors);
  const { ...reqData }: IPlaceUpdateData = req.body;
  const placeId = req.params.pid;

  try{
    await Place.findByIdAndUpdate(placeId,{...reqData });

  }
  catch(error){
    return next(new HttpError('Something went wrong',500));
  }

  res.status(200).json({place: placeId, update_value: {...reqData}});
}
//#endregion

//#region DELETE
export async function removePlaceById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const placeId = req.params.pid;
  try{
    await Place.findByIdAndDelete(placeId);

  }
  catch(error){
    return next(new HttpError('Something went wrong',500));
  }
  res.status(200).json({ message: "Delete place." });
}
//#endregion
