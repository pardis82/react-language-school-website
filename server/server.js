import userRoutes from "./routes/users.js";
import courseRoutes from "./routes/courses.js";
import classRoutes from "./routes/classes.js";
import teacherRoutes from "./routes/teachers.js";
import assignedclassRoutes from "./routes/assignedclasses.js";
import poolPromise from "./db.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/classes", classRoutes);
app.use("/teachers", teacherRoutes);
app.use("/assignedclasses", assignedclassRoutes)

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});