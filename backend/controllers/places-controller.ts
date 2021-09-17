import { HttpError } from "../models/http-error";
import express, { Request, Response, NextFunction } from 'express';

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

export function getPlaceById (req:Request,res:Response,next:NextFunction){
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {return p.id===placeId});
    if(!place){
        const err = new HttpError('Could not find a place for the provided place id.',404);
        return next(err);
    }

    res.json({place});
}

export function getPlaceByUserId(req:Request,res:Response,next:NextFunction) {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {return p.creator===userId});

    if(!place){
        const err = new HttpError('Could not find a place for the provided user id.',404);
        return next(err);
    }

    res.json({place});
}