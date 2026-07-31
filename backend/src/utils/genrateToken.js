import dotenv from "dotenv"
import jwt from "jsonwebtoken";

dotenv.config();

const genrateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.jwt_secret,{expiresIn:"7d"})

    res.cookie("jwt-chatapp",token,{
        maxAge:7*24*3600*1000,
        sameSite:"strict",
        httpOnly:true
    })

    return token
}

export default genrateToken;