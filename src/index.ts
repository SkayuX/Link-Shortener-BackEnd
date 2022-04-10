import createApp from "./utils/createApp";
import { config } from "dotenv";
import path from "path";
import router from "./Routes";
config();

const app = new createApp({
  mode: process.env.MODE,
  dirname: path.join(__dirname),
  mongoString: process.env.MONGO_STRING,
  router: router,
}).getApp();

app.listen(8080);
