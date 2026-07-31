import { Router } from "express";
import {signUp,Login,Logout,
    updateProfile,checkAuth
} from "../controllers/auth.controller.js"

import checkLogin from "../middleware/checkLogin.middleware.js";
import { storage } from "../utils/cloudinary.js";
import multer from "multer"
const upload = multer({ storage: storage });

const router=Router();

router.post("/signup",signUp);
router.post("/login",Login);
router.post("/logout",Logout);

router.put("/updateprofile",checkLogin,upload.single("profilePic"),updateProfile);
router.get("/check",checkLogin,checkAuth)

export default router