const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const studentGroupRoutes = require("./routes/studentGroupRoute");
const submissionRoute = require("./routes/groupSubmissionRoute");

const DocRoutes = require("./routes/docUploadRoute");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/files", express.static(path.join(__dirname, "files")));

app.use("/api/students", studentRoutes);
app.use("/api/studentGroup", studentGroupRoutes);
app.use("/api/groupSubmission", submissionRoute);
app.use(DocRoutes)

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`));