import { useCallback, useReducer } from "react";
import {
  PlaceAction,
  PlaceActionState,
} from "../../places/pages/Utils/Actions/PlacesActions";

const formReducer = (state: PlaceActionState, action: PlaceAction): any => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const input in state.inputs) {
        if (!state.inputs[input]) {
          continue;
        }
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
          [action.inputId || ""]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initInput: any, initFormValid: boolean) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initInput,
    isValid: initFormValid,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback((inputData: any, formValidity: boolean) => {
    dispatch({
      type: "SET_DATA",
      inputs: { ...inputData },
      isValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
