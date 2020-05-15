import routes from "../routes"
import multer from "multer"
import path from "path"
//const multerClothes = multer({dest:"uploads/clothes/"})//uploads폴더에 파일을 저장시킨다.
const multerCodys = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/codys');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});
const multerClothes = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/clothes');
      },
      filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + path.extname(file.originalname));
      }
    }),
  });//-> req.file에 이미지 저장한다. 나머지데이터는 req.body에 저장.. 이코드가 무조건 있어야함 모든함수에서 body파싱을 위해선
export const localsMiddleware=(req,res,next)=>{
    res.locals.siteName = "ALL ABOUT YOUR CLOSET"
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;//요청에서 유저를 빼와서 응답에 저장 (로컬전역으로) 유저가 없는 경우 널값을 배당
    next();
}
export const onlyPublic = (req,res,next)=>{
    if(req.user){
        res.redirect(routes.home);
    }//로그인이 되어있다면 홈으로
    else{
        next();
    }
}//로그인이 되어있는 경우

export const onlyPrivate = (req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.redirect(routes.login);//로그아웃되어있는 경우 홈으로 간다.
    }
}//로그아웃되어있는경우
export const uploadClothes = multerClothes.single("clothesFile");
export const uploadCodys = multerCodys.single("codyFile");
/*export const uploadClothes = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});*/