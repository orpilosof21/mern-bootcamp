export const baseUrl = 'http://localhost:8000/api/';

const usersBaseRoute = 'users/';
const placesBaseRoute = 'places/';


export function getUsersRoutes(route:string){
    return baseUrl+usersBaseRoute+route;
}

