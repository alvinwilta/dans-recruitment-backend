import { Pagination } from "../interfaces/job.interface";

const paginate = <T>(data: T[], pagination: Pagination): T[] => {
  const startIndex = (pagination.page - 1) * pagination.limit;
  const endIndex = pagination.page * pagination.limit;
  return data.slice(startIndex, endIndex);
};

export default paginate;
