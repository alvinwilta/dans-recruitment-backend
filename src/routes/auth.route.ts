import { Router } from "express";
import { verifyBodyRequest } from "../middlewares/verifyRequest";
import auth from "../controller/auth.controller";
import { verifyToken } from "../middlewares/auth.jwt";

const authRoute = Router();

authRoute.post("/register", verifyBodyRequest, auth.register);
authRoute.post("/login", verifyBodyRequest, auth.login);
authRoute.post("/logout", verifyToken, auth.logout);

export default authRoute;
