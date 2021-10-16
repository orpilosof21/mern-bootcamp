import React from "react";
import Card from "../../../shared/components/UIElements/Card/Card";
import PlaceItem, { IPlaceItem } from "../PlaceItem/PlaceItem";
import Button from "../../../shared/components/FormElements/Button/Button";

import "./PlaceList.css";

interface IPlaceList {
  items: IPlaceItem[];
  onDelete: (arg0: string) => void;
}

const PlaceList = (props: IPlaceList) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  console.log(props);
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place._id}
          id={place._id || ""}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creatorId}
          location={place.location}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
