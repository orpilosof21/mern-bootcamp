import { useCallback, useReducer } from "react";
import Input, {
  InputActionState,
} from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import { newPlaceText } from "../../../shared/Utils/uiText";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/Utils/validators";

import "./NewPlace.css";
import { IObjectKeys } from "../../../shared/Utils/object";

type NewPlaceActionType = "INPUT_CHANGE";

interface NewPlacesInputEntries extends IObjectKeys<InputActionState> {
  title: InputActionState;
  description: InputActionState;
  address: InputActionState;
}

interface NewPlaceActionState {
  inputs: NewPlacesInputEntries;
  isValid: boolean;
}

interface NewPlaceAction {
  type: NewPlaceActionType;
  isValid: boolean;
  value: string;
  inputId: string;
}

const formReducer = (
  state: NewPlaceActionState,
  action: NewPlaceAction
): NewPlaceActionState => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const input in state.inputs) {
        if (input === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[input].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const initializer = createInitializer();

const NewPlace = () => {
  const [formState, dispatch] = useReducer(formReducer, initializer);

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    [dispatch]
  );

  const placeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
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

function createInitializer(): NewPlaceActionState {
  return {
    inputs: {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
    },
    isValid: false,
  };
}
