import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import routes from "./routes/apiRoutes.js";
import { priceFeedService } from "./services/priceFeedService.js";

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
app.use("/api", routes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    
    // Start the price feed service
    priceFeedService.start();
  })
  .catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
