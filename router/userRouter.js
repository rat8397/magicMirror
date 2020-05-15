import express from "express"
import { userDetail, change_password, get_edit_profile, post_edit_profile } from "../controllers/userController";

import routes from "../routes";
import { onlyPrivate } from "../middleware/middlewares";
import { myCloset } from "../controllers/clothesController";


const userRouter = express.Router();
userRouter.get(routes.edit_profile(),onlyPrivate,get_edit_profile)
userRouter.post(routes.edit_profile(),onlyPrivate,post_edit_profile)

userRouter.get(routes.closet(),onlyPrivate,myCloset);
userRouter.get(routes.change_password,onlyPrivate,change_password)
userRouter.get(routes.user_detail(),userDetail)//겟 라우터 순서가 중요하다


export default userRouter;