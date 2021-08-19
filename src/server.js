// This file start the server with Express.js

const express = require("express");
const cors = require("cors");
const app = express();

const routes = require("./routes");
const Error = require("./middleware/Error")

app.use(express.json());
app.use(cors());

app.use(routes);

app.use(Error);

app.listen(3333, () => console.log("Server is running at port 3333 🔥"))