import React from "react";
import { IPlaceItem } from "../components/PlaceItem/PlaceItem";
import PlaceList from "../components/PlaceList/PlaceList";
import { useParams } from "react-router-dom";
import { IRouteParams } from "../../App";

const UserPlaces = () => {
  const DUMMY_PLACES = [
    {
      id: "p1",
      title: "Empire State Building",
      description: "One of the most famous sky scrapers in the world!",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
      address: "20 W 34th St, New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng: -73.9878584,
      },
      creatorId: "u1",
    },
    {
      id: "p2",
      title: "Empire State Building",
      description: "One of the most famous sky scrapers in the world!",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
      address: "20 W 34th St, New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng: -73.9878584,
      },
      creatorId: "u2",
    },
  ] as IPlaceItem[];

  const { userId } = useParams<IRouteParams>();
  const loadedPlaces = DUMMY_PLACES.filter(
    (place) => place.creatorId === userId
  );
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
