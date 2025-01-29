import {apiError} from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import { AsyncWrap} from "../utils/AsyncWrap.js"
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import genrateToken from "../utils/genrateToken.js";
import { cloudinary } from "../utils/cloudinary.js";

const signUp=AsyncWrap(async(req,res)=>{

    const {email,fullName,password}=req.body;

    if(!email || !fullName || !password){
        throw new apiError(400,"All field required");
    }

    const user=await User.findOne({ $or : [{email} , {fullName}]});

    if(password.length<6){
        throw new apiError(400,"Password should be 6 character");   
    }

    if(user){
        throw new apiError(400,"User of this name or email already exist");
    }

    const salt=await bcryptjs.genSalt(10);
    const hashPassword=await bcryptjs.hash(password,salt);

    const newUser=await User.create({
        email,
        fullName,
        password:hashPassword,
    })

    genrateToken(newUser._id,res);

    const registerUser=await User.findById(newUser._id).select("-password")

    return res.status(200).json(new ApiResponse(200,registerUser,"User register successfully"))

})

const Login=AsyncWrap(async(req,res)=>{

    const {email,password}=req.body;

    if(!email || !password){
        throw new apiError(400,"All field required")
    }

    const user=await User.findOne({email});

    if(!user){
        throw new apiError(400,"User with this Email is not register")
    }

    const comparePassword=await bcryptjs.compare(password,user.password);

    if(!comparePassword){
        throw new apiError(400,"Invalid password");
    }

    genrateToken(user._id,res);

    const loginUser=await User.findById(user._id).select("-password");

    return res.status(200).json(new ApiResponse(200,loginUser,"Login successfully!"))

})

const Logout=AsyncWrap(async(req,res)=>{

    res.clearCookie("jwt-chatapp")

    return res.status(200).json(new ApiResponse(200,"Logout successfully!"))
})

const updateProfile=AsyncWrap(async(req,res)=>{
    const id=req.user?._id;
    // console.log(req.file)

    if(!req.file){
        throw new apiError(400,"Profile pic required")
    }

    const user=await User.findById(id);

    if(!user){
        throw new apiError(400,"User not found")
    }

    if (user.profilePic) {
        const re=await cloudinary.uploader.destroy(user.profilePicName);  
    }
    user.profilePic = req.file?.path;
    user. profilePicName=req.file?. filename;
    await user.save();
   

    const userUpdate=await User.findById(user._id).select("-password");

    return res.status(200).json(new ApiResponse(200,userUpdate,"Success!"))
})

const checkAuth=AsyncWrap(async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,req.user))
})

export {
    signUp,Login,Logout,
    updateProfile,
    checkAuth
}
