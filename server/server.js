const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const connectDataBase = require("./config/database.js");

//import routers
//admin
const adminAuthRoutes = require("./routes/adminAuthRoutes.js");
const uploadDocRoutes = require("./routes/uploadDocRoutes.js");
const staffManageRoutes = require("./routes/staffManageRouts.js");
const panelRoutes = require("./routes/allocatePanelRoutes.js");
const studentsRoutes = require("./routes/studentsManageRouts.js");
const panelMemberMngtRouts = require("./routes/panelMemberManagemetRouts.js");

//students routs
const studentRoutes = require("./routes/studentRoutes.js");
const studentGroupRoutes = require("./routes/studentGroupRoute.js");
const submissionRoute = require("./routes/groupSubmissionRoute.js");
const DocRoutes = require("./routes/docUploadRoute.js");

//student routs
// Import staff router
const staffRoutes = require("./routes/staffRoutes.js");
//Import marks router
const markRoutes = require("./routes/marksRoutes.js");
//Import topic accept router
const topicRoutes = require("./routes/topicRoute");

//import middleware
const adminNotFoundMiddleware = require("./middleware/admin-not-found.js");
const adminErrorHandlerMiddleware = require("./middleware/admin-error-handler.js");
const authenticateAdmin = require("./middleware/adminAuth.js");

const app = express();
dotenv.config();
connectDataBase();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routers
//admin
app.use("/api/v1/admin-auth", adminAuthRoutes);
app.use("/api/v1/docs", authenticateAdmin, uploadDocRoutes);
app.use("/api/v1/staff", authenticateAdmin, staffManageRoutes);
app.use("/api/v1/panel", authenticateAdmin, panelRoutes);
app.use("/api/v1/student", authenticateAdmin, studentsRoutes);
app.use("/api/v1/panel-members", authenticateAdmin, panelMemberMngtRouts);

//students
app.use("/api/students", studentRoutes);
app.use("/api/studentGroup", studentGroupRoutes);
app.use("/api/groupSubmission", submissionRoute);
app.use(DocRoutes);

//staff
app.use("/api/staff", staffRoutes);
app.use("/api/marks", markRoutes);
app.use("/api/topic", topicRoutes);

// middleware
app.use(adminErrorHandlerMiddleware);
app.use(adminNotFoundMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`));
