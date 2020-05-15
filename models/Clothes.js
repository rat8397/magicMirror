import mongoose from "mongoose";
const ClothesSchema = new mongoose.Schema({
    fileUrl:{
        type : String,
        required:"File Url is required"
    },
    color:{
        type : String,
        required:"Color is required"
    },
    creatorID:{
        type : String,
        required : "creator is required"
    },
    category:{
        type : String,
        required :"Category is required"
    },
    category_detail:{
        type : String,
        required : "category_detail is required"
    },
    season:{
        type: String,
        required : "season is required"
    }
    

    
})
const model = mongoose.model("Clothes",ClothesSchema);
export default model;