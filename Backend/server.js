import 'dotenv/config';
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoutes.js';

const app = express();
const port = 4000; // Fixed port for local use

// Middleware
app.use(express.json());

// Simplified CORS for Localhost
app.use(cors({
    origin: [
        "http://localhost:5173", // Main Frontend
        "http://localhost:5174"  // Admin Panel
    ],
    credentials: true
}));

// DB Connection
connectDB();

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
    res.send("API Working Locally");
});

// Start Server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});