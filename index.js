import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import api from "./api.js";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("", api);

app.use((err, req, res, next) => {
	res.status(500).send("Uh oh! An unexpected error ocurred.");
})

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
})