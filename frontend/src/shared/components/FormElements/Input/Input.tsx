import React, { useReducer, useEffect } from "react";
import { validate } from "../../../Utils/validators";

import "./Input.css";

interface IInput {
  element: string;
  id: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  label: string;
  errorText?: string;
  validators?: any;
  value?: string;
  valid?: boolean;
  onInput: (arg0: string, arg1: string, arg2: boolean) => void;
}

type InputActionType = "CHANGE" | "TOUCH";

export interface InputActionState {
  value: string;
  isValid: boolean;
  isTouched?: boolean;
}

interface InputAction {
  type: InputActionType;
  val?: string;
  validators?: any;
}

const defaultErrorText = "ERROR";

const inputReader = (
  state: InputActionState,
  action: InputAction
): InputActionState => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val || "",
        isValid: validate(action.val || "", action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props: IInput) => {
  const initializer = {
    value: props.value || "",
    isValid: props.valid || false,
    isTouched: false,
  };

  const [inputState, dispatch] = useReducer(inputReader, initializer);
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    props.onInput(props.id, inputState.value, inputState.isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    dispatch({
      type: "CHANGE",
      val: event.currentTarget.value as string,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        checkInputState(inputState) && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {checkInputState(inputState) && (
        <p>{props.errorText || defaultErrorText}</p>
      )}
    </div>
  );
};

export default Input;

function checkInputState(inputState: InputActionState) {
  return !inputState.isValid && inputState.isTouched;
}
