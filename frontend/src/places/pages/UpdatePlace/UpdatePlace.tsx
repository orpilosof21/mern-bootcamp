import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../../shared/components/FormElements/Button/Button";
import Card from "../../../shared/components/UIElements/Card/Card";
import Input from "../../../shared/components/FormElements/Input/Input";
import { updatePlaceText } from "../../../shared/Utils/uiText";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/Utils/validators";
import { DUMMY_PLACES } from "../UserPlaces";
import "../PlaceForm.css";
import { useForm } from "../../../shared/hooks/form-hook";

interface UpdatePlaceInput {
  placeId: string;
}

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);

  const updatePlaceParams = useParams<UpdatePlaceInput>();
  const placeId = updatePlaceParams.placeId;

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

  const idPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (idPlace) {
      setFormData(
        {
          title: {
            value: idPlace?.title,
            isValid: true,
          },
          description: {
            value: idPlace?.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, idPlace]);

  const placeUpdateSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  if (!idPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText={updatePlaceText.errTitleText}
        onInput={inputHandler}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText={updatePlaceText.errDesText}
        onInput={inputHandler}
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
