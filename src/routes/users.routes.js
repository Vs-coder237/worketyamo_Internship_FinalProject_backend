import { Router } from "express";
import userController from "../controllers/users.contollers.js";

const routes = Router()

routes.get('/', userController.hello)

export default routes