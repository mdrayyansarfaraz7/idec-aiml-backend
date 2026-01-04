import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";
import routes from "./routes/index-route.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",     // Vite dev
      "http://localhost:3000",     // Next.js dev 
    ],
    credentials: true,
  })
);

app.use("/api", routes);


app.get("/", (req, res) => {
  res.send("IDEC Backend Running");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
