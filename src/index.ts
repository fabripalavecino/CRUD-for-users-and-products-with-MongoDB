import express, { Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";


dotenv.config();


import routesV1 from "./routes/v1";

declare global{
    namespace Express{
        export interface Request {
            sessionData: any;
        }
    }
}


const app: Application = express();

// parse application/ x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesV1(app);

const PORT: number | string =  4000 || process.env.PORT;

mongoose
  .connect(process.env.MONGO!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongodb");
    app.listen(PORT, () => {
      console.log(`running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("mongodb error:", error);
  });
