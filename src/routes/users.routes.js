import { Router } from "express";
import Authentification from "../controllers/users.contollers.js";

const routes = Router()

routes.get('/', Authentification.signup)

export default routes