import authRoute from "./auth.route";
import jobRoute from "./job.route";

export default function setupRoute(app: any) {
  app.use("/positions", jobRoute);
  app.use("/auth", authRoute);
}
