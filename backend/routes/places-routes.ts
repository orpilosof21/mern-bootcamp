import { Router } from "express";
import { check } from "express-validator";
import {
  createPlace,
  getPlaceById,
  getPlacesByUserId,
  removePlaceById,
  updatePlaceById,
} from "../controllers/places-controller";

const router = Router();

//#region Validators
const Validators = {
  createPlaceValidator: [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  updatePlaceValidator: [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
  ],
};
//#endregion

//#region GET
router.get("/:pid", getPlaceById);
router.get("/user/:uid", getPlacesByUserId);
router.get("/users/:uid", getPlacesByUserId);
//#endregion

//#region POST
router.post("/", Validators.createPlaceValidator, createPlace);
//#endregion

//#region PATCH
router.patch("/:pid", Validators.updatePlaceValidator, updatePlaceById);
//#endregion

//#region DELETE
router.delete("/:pid", removePlaceById);
//#endregion

module.exports = router;
