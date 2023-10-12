import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

//* MONGODB
//* Configuration for mongodb
//* Setting environment for staging server, local server, and test server
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;

const MONGO_LOCAL_HOSTNAME = process.env.MONGO_LOCAL_HOSTNAME;
const MONGO_LOCAL_PORT = process.env.MONGO_LOCAL_PORT;
const MONGO_LOCAL_DB = process.env.MONGO_LOCAL_DB;

const MONGO = {
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url_server: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/?retryWrites=true&w=majority`,
  url_local: `mongodb://${MONGO_LOCAL_HOSTNAME}:${MONGO_LOCAL_PORT}/${MONGO_LOCAL_DB}`,
};

/**
 * getServerHostname: to adjust hostname according to the deployment
 * Currently using cyclic as deployment app
 * @returns hostname
 */
const getServerHostname = () => {
  return process.env.CYCLIC_URL || process.env.SERVER_HOSTNAME;
};
const SERVER_PORT = process.env.PORT || process.env.SERVER_PORT;

const SERVER = {
  hostname: getServerHostname(),
  port: SERVER_PORT,
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
