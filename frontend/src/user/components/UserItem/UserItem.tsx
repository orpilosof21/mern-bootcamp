import React from "react";
import { Link } from "react-router-dom";

import "./UserItem.css";
import Avatar from "../../../shared/components/UIElements/Avatar/Avatar";
import Card from "../../../shared/components/UIElements/Card/Card";
import { IPlaceItem } from "../../../places/components/PlaceItem/PlaceItem";

export interface IUserItem {
  id: string;
  image: string;
  name: string;
  places: IPlaceItem[];
}

function UserItem(props: IUserItem) {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={getPlacesLinkById(props.id)}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.places.length}{" "}
              {props.places.length === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;

function getPlacesLinkById(id: string) {
  return `/${id}/places`;
}
