import express from "express";
import routes from "../routes"

import { getUpload, postUpload,  clothes_delete, clothes_detail,edit_closet, getEdit_clothes_info, postEdit_clothes_info,getEdit_clothes_img, postEdit_clothes_img, getSummerCloset, getWinterCloset, getSpringfallCloset, getShoesCloset } from "../controllers/clothesController";
import { uploadClothes, onlyPrivate } from "../middleware/middlewares";

const clothesRouter = express.Router();

clothesRouter.get(routes.upload(),onlyPrivate,getUpload);
clothesRouter.post(routes.upload(),onlyPrivate,uploadClothes,postUpload);
clothesRouter.get(routes.edit(),onlyPrivate,edit_closet)
clothesRouter.get(routes.clothes_delete(),onlyPrivate,clothes_delete)
clothesRouter.get(routes.clothes_detail(),onlyPrivate,clothes_detail)
clothesRouter.get(routes.edit_clothes_info(),onlyPrivate,getEdit_clothes_info)
clothesRouter.post(routes.edit_clothes_info(),onlyPrivate,uploadClothes,postEdit_clothes_info)//multer를 사용하는 미드웨어를 추가해야 제대로 req.body를 반환
clothesRouter.get(routes.edit_clothes_img(),onlyPrivate,getEdit_clothes_img)
clothesRouter.post(routes.edit_clothes_img(),onlyPrivate,uploadClothes,postEdit_clothes_img)


clothesRouter.get(routes.summer_closet(),onlyPrivate,getSummerCloset);
clothesRouter.get(routes.winter_closet(),onlyPrivate,getWinterCloset);
clothesRouter.get(routes.springfall_closet(),onlyPrivate,getSpringfallCloset);
clothesRouter.get(routes.shoes_closet(),onlyPrivate,getShoesCloset);


export default clothesRouter;
