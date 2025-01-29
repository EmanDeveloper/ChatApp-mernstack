import {apiError} from "../utils/apiError.js";
import { AsyncWrap} from "../utils/AsyncWrap.js"
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

const checkLogin=AsyncWrap(async(req,res,next)=>{

    const token=req.cookies["jwt-chatapp"];

    if(!token){
        throw new apiError(400,"Please login first")
    }

    const decodeToken= jwt.verify(token,process.env.jwt_secret);

    const user=await User.findById(decodeToken.userId).select("-password");

    if(!user){
        throw new apiError(400,"User not found")
    }

    req.user=user;
    next();
})

export default checkLogin