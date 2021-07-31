import Input, {
  InputActionState,
} from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import { newPlaceText } from "../../../shared/Utils/uiText";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/Utils/validators";

import { useForm } from "../../../shared/hooks/form-hook";
import "../PlaceForm.css";
import { IObjectKeys } from "../../../shared/Utils/object";

type NewPlaceActionType = "INPUT_CHANGE";

interface NewPlacesInputEntries extends IObjectKeys<InputActionState> {
  title: InputActionState;
  description: InputActionState;
  address: InputActionState;
}

export interface NewPlaceActionState {
  inputs: NewPlacesInputEntries;
  isValid: boolean;
}

export interface NewPlaceAction {
  type: NewPlaceActionType;
  isValid: boolean;
  value: string;
  inputId: string;
}

const defaultInput = {
  title: { value: "", isValid: false },
  description: { value: "", isValid: false },
  address: { value: "", isValid: false },
};

const NewPlace = () => {
  const [formState, inputHandler] = useForm(defaultInput, false);

  const placeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText={newPlaceText.titleErrMsg}
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText={newPlaceText.descriptionErrMsg}
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText={newPlaceText.addressErrMsg}
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
