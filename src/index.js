const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
const cloudinary = require("./cloudinary/Cloudinary");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

connectToMongo();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/auth", require("./routes/auth"));
// app.use("/api/todo", require("./routes/todo"));

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
