import { HttpError } from "../models/http-error";
import express, { Request, Response, NextFunction } from 'express';
import { FindByProp } from "./utils";
import { v4 as uuid_v4 } from "uuid";

const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous sky scrapers in the world!',
      location: {
        lat: 40.7484474,
        lng: -73.9871516
      },
      address: '20 W 34th St, New York, NY 10001',
      creator: 'u1'
    }
  ];

  interface IPlaceData {
    title: string,
    description: string,
    location: {
      lat: number;
      lng: number;
    },
    address: string,
    creator: string
  }

//#region GET
export function getPlaceById (req:Request,res:Response,next:NextFunction){
    const placeId = req.params.pid;
    const place = FindByProp(DUMMY_PLACES,placeId,'id');
    if(!place){
        const err = new HttpError('Could not find a place for the provided place id.',404);
        return next(err);
    }

    res.json({place});
}

export function getPlaceByUserId(req:Request,res:Response,next:NextFunction) {
    const userId = req.params.uid;
    const place = FindByProp(DUMMY_PLACES,userId,'creator');
    if(!place){
        const err = new HttpError('Could not find a place for the provided user id.',404);
        return next(err);
    }

    res.json({place});
}
//#endregion

//#region  POST
export function createPlace(req:Request,res:Response,next:NextFunction) {
  const {...createdPlace}: IPlaceData = req.body;

  DUMMY_PLACES.push({id: uuid_v4(), ...createdPlace});
  console.log(DUMMY_PLACES);

  res.status(201).json({place: {id: uuid_v4(), ...createdPlace}});
  
}
//#endregion