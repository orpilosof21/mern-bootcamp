export const baseUrl = "http://localhost:8000/api/";

const usersBaseRoute = "users/";
const placesBaseRoute = "places/";

export const httpAction = {
  post: "POST",
  get: "GET",
  patch: "PATCH",
  del: "DELETE",
};

export function getUsersRoutes(route = "") {
  return baseUrl + usersBaseRoute + route;
}

export function getPlacesRoutes(route = "") {
  return baseUrl + placesBaseRoute + route;
}
