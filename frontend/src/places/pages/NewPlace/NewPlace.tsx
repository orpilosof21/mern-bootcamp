import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import { newPlaceText } from "../../../shared/Utils/uiText";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/Utils/validators";
import { useHistory } from "react-router-dom";
import { useForm } from "../../../shared/hooks/form-hook";
import "../PlaceForm.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { getPlacesRoutes, httpAction } from "../../../shared/Utils/urlFetch";
import { useContext } from "react";
import { AuthContext } from "../../../shared/context/auth-context";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";

const defaultInput = {
  title: { value: "", isValid: false },
  description: { value: "", isValid: false },
  address: { value: "", isValid: false },
};

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const httpClient = useHttpClient();
  const [formState, inputHandler] = useForm(defaultInput, false);
  const history = useHistory();

  const placeSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await httpClient.sendRequest(
        getPlacesRoutes(),
        httpAction.post,
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId,
        }),
        { "Content-Type": "application/json" }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={httpClient.error} onClear={httpClient.clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {httpClient.isLoading && <LoadingSpinner asOverlay />}
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
    </>
  );
};

export default NewPlace;
