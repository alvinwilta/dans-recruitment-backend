import dotenv from "dotenv";
import logger from "../utils/logger";
dotenv.config({ path: "./.env" });

if (!process.env.SECRET || !process.env.REFRESH_SECRET) {
  logger.error("No secret token found");
  throw new Error("No secret token found");
}

const authConfig = {
  accessTokenSecret: process.env.SECRET,
  refreshTokenSecret: process.env.REFRESH_SECRET,
  salt: 10,
  accessTokenTtl: 15 * 60 * 1000,
  refreshTokenTtl: 365 * 24 * 60 * 1000,
  cookieMaxAge: 15 * 60 * 1000,
};

export default authConfig;
