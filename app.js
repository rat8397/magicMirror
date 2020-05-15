import express from "express"
import morgan from "morgan"
import flash from 'connect-flash';


import helmet from "helmet"
import cookie_parser from "cookie-parser"
import body_parser from "body-parser"
import passport from "passport"
import {localsMiddleware} from "./middleware/middlewares.js"
import globalRouter from "./router/globalRouter"
import userRouter from "./router/userRouter"
import "./passport"
import session from "express-session"
import MongoStore from "connect-mongo"
import mongoose from "mongoose"
import routes from "./routes"
import dotenv from "dotenv"
import clothesRouter from "./router/clothesRouter.js"
import codyRouter from "./router/codyRouter.js";
dotenv.config();
const app = express(); //express nodejs의 프레임워크이다. -> 서버
const CookieStore = MongoStore(session) 
app.set("view engine","pug"); //화면을 보여주기위해 html파일대신 pug라는 템플릿엔진을 사용한다.
app.use("/uploads",express.static("uploads"))//라우팅인가? /upload로 가면 uploads폴더로 가라는 뜻인듯
app.use("/static",express.static("static"))
app.use(cookie_parser());
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("tiny"));
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave : true,
    saveUninitialized : false,
    store : new CookieStore({
        mongooseConnection:mongoose.connection
    })//서버를 변경하여 재시작하게되어도, 로그인상태가 유지된다
})) // 세션 -> 쿠키를 생성 

app.use(passport.initialize())//저장하기전 초기화 user정보가 req.user로 들어가게된다.
app.use(passport.session())//세선도 저장 -> 로그인을 지속시키기위해서 서버에 저장한 세션을 이용한다.

//passport.js의 두함수가 실행됨
//passport.serializeUser(User.serializeUser());//어떤 정보를 쿠키에게 주는가
//passport.deserializeUser(User.deserializeUser());//쿠키의 정보를 req.user에 연결시켜준다. 미드웨어나 라우터함수들에게 전달해주는것
app.use(localsMiddleware);
app.use(flash())

app.use(routes.home,globalRouter);//전역
app.use(routes.home,userRouter);//유저관련
app.use(routes.home,clothesRouter);//유저관련
app.use(routes.home,codyRouter);






export default app;
