import mongoose from "mongoose";
const CodySchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File Url is required",
  },  
  outer_color: {
    type: String,
  },
  outer_season: {
    type: String,
  },
  outer_category: {
    type: String,
  },
  outer_category_detail: {
    type: String,
  },
  top_color: {
    type: String,
  },
  top_season: {
    type: String,
  },
  top_category: {
    type: String,
  },
  top_category_detail: {
    type: String,
  },
  bottom_color: {
    type: String,
  },
  bottom_season: {
    type: String,
  },
  bottom_category: {
    type: String,
  },
  bottom_category_detail: {
    type: String,
  },
  shoes_color: {
    type: String,
  },
  shoes_season: {
    type: String,
  },
  shoes_category: {
    type: String,
  },
  shoes_category_detail: {
    type: String,
  }
});
const model = mongoose.model("Cody", CodySchema);

export default model;
