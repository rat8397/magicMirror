import express from "express";
import routes from "../routes"
import { get_upload_cody, post_upload_cody, post_cody_edit,get_cody_edit, get_cody_recommend, post_cody_recommend} from "../controllers/codyController";
import { onlyPrivate, uploadCodys } from "../middleware/middlewares";
const codyRouter = express.Router();

codyRouter.get(routes.upload_cody(),onlyPrivate,get_upload_cody);

codyRouter.post(routes.upload_cody(),onlyPrivate,uploadCodys,post_upload_cody);
codyRouter.get(routes.cody_edit(),onlyPrivate,get_cody_edit);
codyRouter.post(routes.cody_edit(),onlyPrivate,uploadCodys,post_cody_edit);

codyRouter.get(routes.cody_recommend(),onlyPrivate,get_cody_recommend);
codyRouter.post(routes.cody_recommend(),onlyPrivate,uploadCodys,post_cody_recommend);


export default codyRouter;