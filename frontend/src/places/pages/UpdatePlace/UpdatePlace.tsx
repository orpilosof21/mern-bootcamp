import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../../shared/components/FormElements/Button/Button";
import Card from "../../../shared/components/UIElements/Card/Card";
import Input from "../../../shared/components/FormElements/Input/Input";
import { updatePlaceText } from "../../../shared/Utils/uiText";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/Utils/validators";
import "../PlaceForm.css";
import { useForm } from "../../../shared/hooks/form-hook";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { IPlaceItem } from "../../components/PlaceItem/PlaceItem";
import { getPlacesRoutes, httpAction } from "../../../shared/Utils/urlFetch";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../shared/context/auth-context";

interface UpdatePlaceInput {
  placeId: string;
}

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const httpClient = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState<IPlaceItem>();
  const updatePlaceParams = useParams<UpdatePlaceInput>();
  const placeId = updatePlaceParams.placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const resData = await httpClient.sendRequest(
          getPlacesRoutes(`${placeId}`)
        );
        setLoadedPlace(resData.place);
        setFormData(
          {
            title: {
              value: resData.place?.title,
              isValid: true,
            },
            description: {
              value: resData.place?.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [httpClient.sendRequest, placeId]);

  const placeUpdateSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await httpClient.sendRequest(
        getPlacesRoutes(`${placeId}`),
        httpAction.patch,
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/" + auth.userId + "/places");
    } catch (err) {}
  };

  if (httpClient.isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!loadedPlace && !httpClient.error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={httpClient.error} onClear={httpClient.clearError} />
      {!httpClient.isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText={updatePlaceText.errTitleText}
            onInput={inputHandler}
            value={loadedPlace.title}
            valid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText={updatePlaceText.errDesText}
            onInput={inputHandler}
            value={loadedPlace.description}
            valid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
