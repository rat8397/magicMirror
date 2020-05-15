import passport from "passport"
import User from "./models/User"
import FacebookStrategy from "passport-facebook"
import dotenv from "dotenv"
import { facebook_login_callback } from "./controllers/userController";
dotenv.config();
passport.use(User.createStrategy())//strategy 로그인을 하는 방식이다. -->passlocalmongoose가 제공하는 strategy를 사용


passport.use(new FacebookStrategy({
    clientID:process.env.FB_ID,
    clientSecret:process.env.FB_SECRET,
    callbackURL:"http://localhost:4000/auth/facebook/callback"
},
facebook_login_callback))

passport.serializeUser(User.serializeUser());//어떤 정보를 쿠키에게 주는가
passport.deserializeUser(User.deserializeUser());//쿠키의 정보를 req.user에 연결시켜준다.

//strategy 