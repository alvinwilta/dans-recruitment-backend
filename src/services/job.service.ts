import { Job, Pagination, SearchParam } from "../interfaces/job.interface";
import logger from "../utils/logger";
import axios from "axios";
import recruitmentAPI from "../config/recruitment.config";
import paginate from "../utils/paginate";
import sanitize from "sanitize-html";
import { isString } from "lodash";

export async function findJobDetailsService(query: any) {
  try {
    // return await TicketModel.findOne(query);
    return false;
  } catch (err: any) {
    logger.error(err);
    throw err;
  }
}

export async function findJobListService(
  searchParam: SearchParam,
  pagination: Pagination
): Promise<Job[] | false> {
  try {
    return await axios.get(recruitmentAPI).then((res) => {
      let jobList: Job[] = res.data;
      const { description, location } = searchParam;

      if (location) {
        jobList = jobList.filter((job) => {
          return job.location.toLowerCase().includes(location.toLowerCase());
        });
      }

      if (description) {
        jobList = jobList.filter((job) => {
          return sanitize(job.description, {
            allowedTags: [],
            allowedAttributes: {},
          })
            .toLowerCase()
            .includes(description.toLowerCase());
        });
      }

      const paginatedJob = paginate(jobList, pagination);
      return paginatedJob;
    });
  } catch (err: any) {
    logger.error(err);
    throw err;
  }
}
