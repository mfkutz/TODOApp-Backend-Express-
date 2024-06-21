import express from "express";
import taskRoutes from "./routes/task.routes.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbCluster = process.env.DB_CLUSTER;
const dbName = process.env.DB_NAME;
const dbClusterNumber = process.env.DB_CLUSTER_NUMBER;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "https://master--prismatic-donut-d5c2c7.netlify.app",
      "http://localhost:3000",
    ],
  })
);

app.use((req, res, next) => {
  console.log(`Request received from origin: ${req.headers.origin}`);
  next();
});

//Routes
app.use("/api/tasks", taskRoutes);

const dbConnectionString = `mongodb+srv://${dbUser}:${dbPass}@${dbCluster}/${dbName}?retryWrites=true&w=majority&appName=${dbClusterNumber}`;

mongoose
  .connect(dbConnectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
