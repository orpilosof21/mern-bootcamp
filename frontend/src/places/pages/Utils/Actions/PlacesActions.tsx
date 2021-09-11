import { InputActionState } from "../../../../shared/components/FormElements/Input/Input";
import { IObjectKeys } from "../../../../shared/Utils/object";

type PlaceActionType = "INPUT_CHANGE" | "SET_DATA";

interface PlacesInputEntries extends IObjectKeys<InputActionState> {
  title: InputActionState;
  description: InputActionState;
  address: InputActionState;
}

export interface PlaceActionState {
  inputs: PlacesInputEntries;
  isValid: boolean;
}

export interface PlaceAction {
  formIsValid?: boolean;
  type: PlaceActionType;
  isValid: boolean;
  value?: string;
  inputId?: string;
  inputs?: string;
}
