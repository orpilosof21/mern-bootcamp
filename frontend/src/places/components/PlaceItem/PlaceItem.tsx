import React, { useContext, useState } from "react";
import Map from "../../../shared/components/UIElements/Map/Map";
import Button from "../../../shared/components/FormElements/Button/Button";

import Card from "../../../shared/components/UIElements/Card/Card";
import Modal, {
  IModal,
} from "../../../shared/components/UIElements/Modal/Modal";
import "./PlaceItem.css";
import { AuthContext } from "../../../shared/context/auth-context";

export interface IPlaceItem {
  _id?: string;
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
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);
  const confirmDeleteHandler = () => {
    console.log("DELETING...");
  };

  const _overlayData: Partial<IModal> = {
    header: props.address,
    contentClass: "place-item__modal-content",
    footerClass: "place-item__modal-actions",
    footer: <Button onClick={closeMapHandler}>Close</Button>,
  };
  const _deleteModalData: Partial<IModal> = {
    show: showConfirmModal,
    onCancel: cancelDeleteHandler,
    header: "Are you sure?",
    footerClass: "place-item__modal-actions",
    footer: (
      <>
        <Button inverse onClick={cancelDeleteHandler}>
          CANCEL
        </Button>
        <Button danger onClick={confirmDeleteHandler}>
          DELETE
        </Button>
      </>
    ),
  };
  return (
    <React.Fragment>
      <Modal show={showMap} onCancel={closeMapHandler} {..._overlayData}>
        <div className="map-container">
          <Map center={props.location} zoom={16} />
        </div>
      </Modal>
      <Modal {..._deleteModalData}>
        <p>Do you want to proceed and delete this place?</p>
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
            {auth.isLoggedIn && (
              <>
                <Button to={`/places/${props.id}`}>EDIT</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  DELETE
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
