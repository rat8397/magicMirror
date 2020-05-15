import express from "express"
import routes from "../routes"
import {home} from "../controllers/globalController"
import { getLogin, getJoin, postJoin, postLogin, logout,getMe, facebook_login, postFacebookLogin } from "../controllers/userController";
import { onlyPublic, onlyPrivate} from "../middleware/middlewares";
import passport from "passport"
import { show_cody, cody_detail } from "../controllers/codyController";
const globalRouter = express.Router();

globalRouter.get(routes.home,home);
globalRouter.get(routes.login,onlyPublic,getLogin);
globalRouter.post(routes.login,onlyPublic,postLogin);

globalRouter.get(routes.join,onlyPublic,getJoin);
globalRouter.post(routes.join,onlyPublic,postJoin,postLogin);

globalRouter.get(routes.logout,onlyPrivate,logout);
globalRouter.get(routes.me,onlyPrivate,getMe);

globalRouter.get(routes.facebook_login,facebook_login) // facebook사이트로 보내는 함수
globalRouter.get(
    routes.facebook_login_callback,
    passport.authenticate("facebook",{failureRedirect :"/login"}),
    postFacebookLogin)//
globalRouter.get(routes.show_cody,show_cody);
globalRouter.get(routes.cody_detail(),cody_detail);
export default globalRouter;

