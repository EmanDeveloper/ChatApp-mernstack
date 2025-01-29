import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app=express();

app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

import autRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";

app.use("/auth",autRouter);
app.use("/messages",messageRouter);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
      status: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  });


export default app;