import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { routePrefix, routes } from './routes/routesUtils';
import { HttpError } from './models/http-error';

const app = express();
const PORT = 8000;
app.use(express.json());

//#region valid routes
app.use(routePrefix.PlacesRoute,routes.PlacesRoute);
//#endregion

//#region error handle
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new HttpError('Could not find a valid route.',404);
  return next(err);
})

app.use((error:HttpError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });
//#endregion

app.listen(PORT);