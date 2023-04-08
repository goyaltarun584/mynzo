const express = require("express");
const mongoose = require('mongoose');
const { SERVER_DB_URI } = require('./constants/constants');
const app = express();
const db = mongoose;

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/", require("./routes/router"));

db.connect(SERVER_DB_URI);
app.listen(PORT, () => {
  console.log("Sever started at PORT", PORT);
});

