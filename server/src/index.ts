import express from "express";
import taskRouter from "./routes/tasks";

const app = express();

const PORT = 3001;

app.use(express.json());

app.use("/api/tasks", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
