import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from 'mongoose';
import routes from "./routes/apiRoutes.js";

const app = express();

app.use(express.json());
app.use("/api", routes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
