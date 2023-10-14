import { RequestHandler } from "express";
import logger from "../utils/logger";
import {
  findJobListService,
  findJobDetailsService,
} from "../services/job.service";
import { StatusCodes } from "http-status-codes";
import { Pagination, SearchParam } from "../interfaces/job.interface";

export const getJobDetails: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    logger.info(`Get job details with: ${id}`);
    const job = await findJobDetailsService(id);
    if (!job) {
      logger.info("No job found");
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "No job found" });
    }
    logger.info("Jobs Found");
    return res.status(StatusCodes.OK).json(job);
  } catch (err: any) {
    logger.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
  }
};

export const getJobList: RequestHandler = async (req, res) => {
  try {
    logger.info(`List jobs`);
    const pagination: Pagination = {
      page: Number(req.query.page || 1),
      limit: Number(req.query.limit || 5),
    };
    const searchParam: SearchParam = {
      is_full_time: JSON.parse(String(req.query.full_time)),
    };
    if (req.query.search) {
      searchParam.description = String(req.query.search);
    }
    if (req.query.location) {
      searchParam.location = String(req.query.location);
    }

    const jobs = await findJobListService(searchParam, pagination);
    logger.info("List jobs fetched");
    return res.status(StatusCodes.OK).json(jobs);
  } catch (err: any) {
    logger.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
  }
};
