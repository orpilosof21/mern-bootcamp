import { useCallback, useReducer } from "react";
import { NewPlaceAction, NewPlaceActionState } from "../../places/pages/NewPlace/NewPlace";

const formReducer = (
    state: NewPlaceActionState,
    action: NewPlaceAction
  ): any => {
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

export const useForm = (initInput:any, initFormValid:boolean) => {

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
      []);

    return [formState, inputHandler];
};