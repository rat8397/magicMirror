import mongoose from "mongoose"
import passportlocal from "passport-local-mongoose"//passport와 mongoose를 연결하기위한작업이다 + 비밀번호 설정 및 확인 자동
const UserSchema = new mongoose.Schema({
    name :String,
    email:String,
    birthday:Date,
    address:String,
    facebookID:Number,
    googleID:Number

})//유저의 스키마이다. 옷데이터베이스 만들어서 연결시켜야댐
UserSchema.plugin(passportlocal,{usernameField:"email"});//무엇으로 구분하는가<회원들을>
const model = mongoose.model("User",UserSchema);//db속 collection의 이름을 USER로 설정한것이다 // username - password 맞춘다
export default model;