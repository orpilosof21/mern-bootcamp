import express from 'express';
import bodyParser from 'body-parser';
import { routePrefix, routes } from './routes/routesUtils';

const app = express();
const PORT = 8000;

app.use(routePrefix.PlacesRoute,routes.PlacesRoute);

app.listen(PORT);