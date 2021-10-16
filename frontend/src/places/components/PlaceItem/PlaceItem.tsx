import React, { useContext, useState } from "react";
import Map from "../../../shared/components/UIElements/Map/Map";
import Button from "../../../shared/components/FormElements/Button/Button";
import { useHistory } from "react-router-dom";
import Card from "../../../shared/components/UIElements/Card/Card";
import Modal, {
  IModal,
} from "../../../shared/components/UIElements/Modal/Modal";
import "./PlaceItem.css";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { getPlacesRoutes, httpAction } from "../../../shared/Utils/urlFetch";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";

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
  onDelete?: (arg0: string) => void;
}

const PlaceItem = (props: IPlaceItem) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const httpClient = useHttpClient();

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteHandler = () => setShowConfirmModal(false);
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await httpClient.sendRequest(
        getPlacesRoutes(`${props._id}`),
        httpAction.del
      );
      props.onDelete
        ? props.onDelete(props._id as string)
        : console.log("DELETE");
    } catch (err) {}
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
      <ErrorModal error={httpClient.error} onClear={httpClient.clearError} />
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
          {httpClient.isLoading && <LoadingSpinner asOverlay />}
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
            {auth.isLoggedIn && auth.userId === props.creatorId && (
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
