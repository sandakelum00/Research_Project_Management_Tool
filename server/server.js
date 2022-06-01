const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const studentGroupRoutes = require("./routes/studentGroupRoute");
const submissionRoute = require("./routes/groupSubmissionRoute");
const cors = require("cors");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/students", studentRoutes);
app.use("/api/studentGroup", studentGroupRoutes);
app.use("/api/groupSubmission", submissionRoute);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`));