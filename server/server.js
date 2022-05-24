const express = require("express");
const dotenv = require("dotenv");
const connectDataBase = require("./config/database.js");

//import routers
const adminAuthRoutes = require("./routes/adminAuthRoutes.js");
const uploadDocRoutes = require("./routes/uploadDocRoutes.js");

//import middleware
const adminNotFoundMiddleware = require("./middleware/admin-not-found.js");
const adminErrorHandlerMiddleware = require("./middleware/admin-error-handler.js");
const authenticateAdmin = require("./middleware/adminAuth.js");

const app = express();
dotenv.config();
connectDataBase();
app.use(express.json());

//routers
app.use("/api/v1/admin-auth", adminAuthRoutes);
app.use("/api/v1/docs", authenticateAdmin, uploadDocRoutes);

// middleware
app.use(adminErrorHandlerMiddleware);
app.use(adminNotFoundMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on port ${PORT}`));
