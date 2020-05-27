import mongoose from "mongoose";
const CodySchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File Url is required",
  },  
  outer_color: {
    type: String,
  },
  outer_category_detail: {
    type: String,
  },
  top_color: {
    type: String,
  },
  top_category_detail: {
    type: String,
  },
  bottom_color: {
    type: String,
  },
  bottom_category_detail: {
    type: String,
  },
  shoes_color: {
    type: String,
  },  
  shoes_category_detail: {
    type: String,
  },
  link:{
    type: String,
  },
  season:{
    type:String
  },
  count:{
    type:Number
  }
});
const model = mongoose.model("Cody", CodySchema);

export default model;
