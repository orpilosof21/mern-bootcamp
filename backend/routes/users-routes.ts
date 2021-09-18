import { Router } from "express";
import { check } from "express-validator";
import {
  getUsersList,
  createAndLogUser,
  logInUser,
} from "../controllers/users-controller";

const router = Router();

//#region Validators
const Validators = {
    signupUserValidator: [check("name").not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({min: 6})]
}
//#endregion

//#region GET
router.get("/", getUsersList);
//#endregion

//#region POST
router.post("/signup", Validators.signupUserValidator, createAndLogUser);
router.post("/login", logInUser);
//#endregion

module.exports = router;
