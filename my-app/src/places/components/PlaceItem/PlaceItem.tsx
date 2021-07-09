import React, { useState } from "react";
import Map from "../../../shared/components/UIElements/Map/Map";
import Button from "../../../shared/components/FormElements/Button/Button";

import Card from "../../../shared/components/UIElements/Card/Card";
import Modal from "../../../shared/components/UIElements/Modal/Modal";
import "./PlaceItem.css";

export interface IPlaceItem {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  location: {
    lat: number;
    lng: number;
  };
}

const PlaceItem = (props: IPlaceItem) => {
  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const _overlayData = {
    header: props.address,
    contentClass: "place-item__modal-content",
    footerClass: "place-item__modal-actions",
    footer: <Button onClick={closeMapHandler}>Close</Button>,
  };

  return (
    <React.Fragment>
      <Modal show={showMap} onCancel={closeMapHandler} {..._overlayData}>
        <div className="map-container">
          {console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")}
          <Map center={props.location} zoom={16} />
          {console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")}
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            <Button to={`/places/${props.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
