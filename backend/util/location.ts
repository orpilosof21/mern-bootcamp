import axios from "axios";
import { HttpError } from "../models/http-error";

const API_KEY = "APIKEYHERE";

export async function getLoactionForAddress(inputAddress: string) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      inputAddress
    )}&key=${API_KEY}`
  );

  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  console.log(data);
  const coordinates = data.results[0].geometry.location;
  return coordinates;
}
