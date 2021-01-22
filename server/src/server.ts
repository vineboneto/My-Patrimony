import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
app.use(
  cors({
    exposedHeaders: ["x-total-patrimonies"],
  })
);
app.use(express.json());
app.use(routes);

app.listen(3333);
