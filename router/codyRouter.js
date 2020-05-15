import express from "express";
import routes from "../routes"
import { get_upload_cody, post_upload_cody} from "../controllers/codyController";
import { onlyPrivate, uploadCodys } from "../middleware/middlewares";
const codyRouter = express.Router();

codyRouter.get(routes.upload_cody(),onlyPrivate,get_upload_cody);

codyRouter.post(routes.upload_cody(),onlyPrivate,uploadCodys,post_upload_cody);


export default codyRouter;