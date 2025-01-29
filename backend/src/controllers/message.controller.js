import {apiError} from "../utils/apiError.js";
import {ApiResponse} from "../utils/apiResponse.js";
import { AsyncWrap} from "../utils/AsyncWrap.js"
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

const getUserForSideBar=AsyncWrap(async(req,res)=>{

    const loginUserId=req.user?._id;

    const filterUser=await User.find({_id : {$ne : loginUserId}}).select("-password");

    return res.status(200).json(new ApiResponse(200,filterUser))
})

const getMessage=AsyncWrap(async(req,res)=>{

    const {id:userToChatId}=req.params;
    const myId=req.user?._id;

    const message=await Message.find({
        $or:[
            {senderId:myId,receiverId:userToChatId},
            {receiverId:userToChatId,senderId:myId}
        ]
    })

    return res.status(200).json(new ApiResponse(200,message))

})

const sendMessage=AsyncWrap(async(req,res)=>{
    const { text} = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const newMessage=await Message.create({
        senderId,
        receiverId,
        text,
        image:req.file?.path,
        imageFileName:req.file?.filename
    })

    return res.status(200).json(new ApiResponse(200,newMessage,"Message sended."))
})

export {
    getUserForSideBar,
    getMessage,
    sendMessage
}