import {Router} from "express"
import checkLogin from "../middleware/checkLogin.middleware.js";
import { getUserForSideBar,
    getMessage,sendMessage
 } from "../controllers/message.controller.js";

const router=Router();

import { storage } from "../utils/cloudinary.js";
import multer from "multer";
const upload = multer({ storage: storage });

router.get("/users",checkLogin,getUserForSideBar);
router.get("/:id",checkLogin,getMessage)

router.post("/send/:id",checkLogin,upload.single("image"),sendMessage)

export default router