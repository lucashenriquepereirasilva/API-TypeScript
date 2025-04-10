import { Router,  } from "express";
import { getUsers } from "../controllers/user.controllers";

const router = Router();
router.get("/users",getUsers)
export default router