import { useEffect, useState } from "react";
import { IPlaceItem } from "../../components/PlaceItem/PlaceItem";
import PlaceList from "../../components/PlaceList/PlaceList";
import { useParams } from "react-router-dom";
import { IRouteParams } from "../../../App";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { getPlacesRoutes } from "../../../shared/Utils/urlFetch";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState<IPlaceItem[]>([]);
  const { userId } = useParams<IRouteParams>();
  const httpClient = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const resData = await httpClient.sendRequest(
          getPlacesRoutes(`user/${userId}`)
        );
        setLoadedPlaces(resData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [httpClient.sendRequest, userId]);

  const placeDeletedHandler = (delPlaceId: string) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((p) => p.id !== delPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={httpClient.error} onClear={httpClient.clearError} />
      {httpClient.isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!httpClient.isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={placeDeletedHandler} />
      )}
    </>
  );
};

export default UserPlaces;
