import { Router } from "express";
import {
  getUsersList,
  createAndLogUser,
  logInUser,
} from "../controllers/users-controller";

const router = Router();

//#region GET
router.get("/", getUsersList);
//#endregion

//#region POST
router.post("/signup", createAndLogUser);
router.post("/login", logInUser);
//#endregion

module.exports = router;
