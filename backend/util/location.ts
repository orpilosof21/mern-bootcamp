import axios from "axios";
import { HttpError } from "../models/http-error";

const API_KEY = "APIKEYHERE";
const default_coor = {
  lat: 0,
  lng: 0,
};

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
  if (data.status === "REQUEST_DENIED") {
    console.error("Location Service:" + data.error_message);
    return default_coor;
  }
  const coordinates = data.results[0].geometry.location;
  return coordinates;
}
