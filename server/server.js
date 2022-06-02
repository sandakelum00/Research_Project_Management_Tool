const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const connectDataBase = require("./config/database.js");

//import routers
const adminAuthRoutes = require("./routes/adminAuthRoutes.js");
const uploadDocRoutes = require("./routes/uploadDocRoutes.js");
const staffManageRoutes = require("./routes/staffManageRouts.js");

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
app.use("/api/v1/admin-auth", adminAuthRoutes);
app.use("/api/v1/docs", authenticateAdmin, uploadDocRoutes);
app.use("/api/v1/staff", authenticateAdmin, staffManageRoutes);

// middleware
app.use(adminErrorHandlerMiddleware);
app.use(adminNotFoundMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`));
