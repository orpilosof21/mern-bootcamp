import express, { Request, Response, NextFunction } from "express";
import { routePrefix, routes } from "./routes/routesUtils";
import { HttpError } from "./models/http-error";
import mongoose from 'mongoose';
const app = express();
const PORT = 8000;
app.use(express.json());

//#region valid routes
app.use(routePrefix.PlacesRoute, routes.PlacesRoute);
app.use(routePrefix.UsersRoute, routes.UsersRoute);
//#endregion

//#region error handle
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new HttpError("Could not find a valid route.", 404);
  return next(err);
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});
//#endregion
mongoose.connect('mongodb+srv://user_or:fNNeqpHT2tiACDDu@cluster0.xxjle.mongodb.net/mern?retryWrites=true&w=majority').then(() => {
  console.log('Connection to db is OK');
  app.listen(PORT);
}).catch(err => {
  console.log(err);
});

