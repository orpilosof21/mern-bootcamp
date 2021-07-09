import { type } from "os";
import React, { useReducer } from "react";
import { validate } from "../../../Utils/validators";

import "./Input.css";

interface IInput {
  element: string;
  id?: string;
  type?: string;
  placeholder?: string;
  rows?: number;
  label: string;
  errorText?: string;
  validators?: any;
}

type ActionType = "CHANGE" | "TOUCH";

interface ActionState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

interface Action {
  type: ActionType;
  val?: string;
  validators?: any;
}

const defaultErrorText = "ERROR";

const inputReader = (state: ActionState, action: Action): ActionState => {
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

const initializer = { value: "", isValid: false, isTouched: false };

const Input = (props: IInput) => {
  // {value: '', isValid: false}
  const [inputState, dispatch] = useReducer(inputReader, initializer);

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

function checkInputState(inputState: ActionState) {
  return !inputState.isValid && inputState.isTouched;
}
