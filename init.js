import app from "./app"
import "./db"
import dotenv from "dotenv" 
import "./models/Clothes"
import "./models/User"
import "./models/Cody"
dotenv.config();
const PORT = process.env.PORT || 3000;

function ListeningHandling(){
    console.log("listening server :"+`http://localhost:${PORT}/`);    
}

app.listen(PORT,ListeningHandling); //서버를 여는 명령문.