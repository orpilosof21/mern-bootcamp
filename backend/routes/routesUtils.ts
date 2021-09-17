import express from 'express';
import bodyParser from 'body-parser';

const usersRoutes = require("./users-routes");
const placesRoutes = require("./places-routes");

export const routes = {
    UserRoute: usersRoutes,
    PlacesRoute: placesRoutes
}

export const routePrefix = {
    EmptyRoute: '/',
    ApiRoute: '/api',
    PlacesRoute: '/api/places',
    UsersRoute: '/api/users',
    UserRoute: '/user',
}