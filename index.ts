import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser"
import cors from "cors"
import router from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
console.log("port",process.env.PORT)

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('*', function(req: Request, res: Response, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from

  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader(
      "Access-Control-Request-Methods",
      "GET, POST, PUT, DELETE"
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});