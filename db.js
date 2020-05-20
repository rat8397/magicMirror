import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
mongoose.connect(   
    process.env.MONGO_URL || 'mongodb://localhost/maggic-mirror',
    {
        useMongoClient:true,
        useNewUrlParser:true,
        useFindAndModify:false
    }
);
const db = mongoose.connection;
const handleOpen = () =>{
    console.log("DB가 연결되었습니다.");

}
const handleError = (error)=>{
    console.log("DB오류가 발생하였습니다.");
}
db.once("open",handleOpen);//only once exec
db.on("error",handleError);