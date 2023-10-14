import {
  Job,
  JobShort,
  Pagination,
  PaginationResult,
  SearchParam,
} from "../interfaces/job.interface";
import logger from "../utils/logger";
import axios from "axios";
import recruitmentAPI from "../config/recruitment.config";
import paginate from "../utils/paginate";
import sanitize from "sanitize-html";
import { omit } from "lodash";

export async function findJobDetailsService(id: string) {
  try {
    return await axios.get(recruitmentAPI).then((res) => {
      let jobList: Job[] = res.data;
      const searchedJob = jobList.find((job) => job.id === id);
      if (!searchedJob) {
        return false;
      }
      return searchedJob;
    });
  } catch (err: any) {
    logger.error(err);
    throw err;
  }
}

export async function findJobListService(
  searchParam: SearchParam,
  pagination: Pagination
): Promise<PaginationResult<JobShort>> {
  try {
    return await axios.get(recruitmentAPI).then((res) => {
      let jobList: Job[] = res.data;
      const { description, location, is_full_time } = searchParam;

      if (location) {
        jobList = jobList.filter((job) => {
          return job.location.toLowerCase().includes(location.toLowerCase());
        });
      }

      if (description) {
        jobList = jobList.filter((job) => {
          if (job.title.toLowerCase().includes(description.toLowerCase())) {
            return true;
          }
          return sanitize(job.description, {
            allowedTags: [],
            allowedAttributes: {},
          })
            .toLowerCase()
            .includes(description.toLowerCase());
        });
      }

      jobList = jobList.filter((job) => {
        const full_time = job.type.toLowerCase().includes("full time");
        return is_full_time ? full_time : !full_time;
      });

      const omittedJobList = jobList.map(
        ({ description, how_to_apply, ...rest }) => rest
      );

      const length = Math.ceil(omittedJobList.length / pagination.limit);
      const paginatedJob: PaginationResult<JobShort> = {
        total: length,
        page: pagination.page,
        data: paginate(omittedJobList, pagination),
      };
      return paginatedJob;
    });
  } catch (err: any) {
    logger.error(err);
    throw err;
  }
}
