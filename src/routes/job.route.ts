import { Router } from "express";
import { getJobList, getJobDetails } from "../controller/job.controller";
import { verifyToken } from "../middlewares/auth.jwt";

const jobRoute = Router();

jobRoute.get("/:id", verifyToken, getJobDetails);
jobRoute.get("/", verifyToken, getJobList);

export default jobRoute;
