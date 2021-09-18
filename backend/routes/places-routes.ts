import { Router } from "express";
import {
  createPlace,
  getPlaceById,
  getPlacesByUserId,
  removePlaceById,
  updatePlaceById,
} from "../controllers/places-controller";

const router = Router();

//#region GET
router.get("/:pid", getPlaceById);
router.get("/user/:uid", getPlacesByUserId);
router.get("/users/:uid", getPlacesByUserId);
//#endregion

//#region POST
router.post("/", createPlace);
//#endregion

//#region PATCH
router.patch("/:pid", updatePlaceById);
//#endregion

//#region DELETE
router.delete("/:pid", removePlaceById);
//#endregion

module.exports = router;
