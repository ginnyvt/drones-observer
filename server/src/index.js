import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cron from "node-cron";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send("Hello from express server!");
});

cron.schedule("*/2 * * * * *", function () {
	console.log("---------------------");
	console.log("running a task every 2 seconds");
});

app.listen(PORT, () => {
	console.log("application listening at port: " + PORT);
});
