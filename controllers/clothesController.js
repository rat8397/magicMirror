import routes from "../routes";
import Clothes from "../models/Clothes";

export const myCloset =  (req, res) => {
  try {     
    res.render("my_closet", { pageTitle: "mycloset" });
  } catch (error) {
    console.log(req);
    res.render("my_closet", { pageTitle: "mycloset"});
  }
};
export const edit_closet = async (req, res) => {
  try {
    const clothes = await Clothes.find({ creatorID: req.user.id });
    console.log(clothes);
    res.render("edit_closet", { pageTitle: "edit your clothes", clothes });
  } catch (error) {
    console.log(error);
    res.render("edit_closet", { pageTitle: "edit your clothes", clothes: [] });
  }
};
export const clothes_delete = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Clothes.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.edit());
};
export const clothes_detail = async (req, res) => {
  const {
    params: { clothes_id },
  } = req;
  try {
    const clothes = await Clothes.find({ _id: clothes_id });
    res.render("clothes_detail", { pageTitle: "detail", clothes });
  } catch (error) {
    console.log(error);
    res.redirect(routes.closet(req.user.id));
  }
};
export const getEdit_clothes_info = (req, res) => {
  const {
    params: { clothes_id },
  } = req;
  res.render("edit_clothes_info", { pageTitle: "UPDATE CLOTHES", clothes_id });
};
export const postEdit_clothes_info = async (req, res) => {
  var {
      body :{color,season,category,category_detail},
  }=req;

  const {
    params: { id, clothes_id },
  } = req;
 
  try {
    const clothes = await Clothes.findById({ _id: clothes_id }); //->"_id"처럼 문자열로 넣어주어야 에러없이 동작

    if (color === undefined) {
      color = clothes.color;
    }
    if (season === undefined) {
      season = clothes.season;
    }
    if (category === undefined) {
      category = clothes.category;
    }
    if (category_detail === undefined) {
      category_detail = clothes.category_detail;
    }

    console.log(color, season, category, category_detail);
    await Clothes.updateOne(clothes, {
      color,
      season,
      category,
      category_detail,
    });
    res.redirect(routes.clothes_detail(id, clothes_id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getEdit_clothes_img = (req, res) => {
  const {
    params: { clothes_id },
  } = req;
  res.render("edit_clothes_img", {
    pageTitle: "UPDATE CLOTHES IMG",
    clothes_id,
  });
};
export const postEdit_clothes_img = async (req, res) => {
  const {
    params: { id, clothes_id },
  } = req;
  var {
    file: { path },
  } = req;
  path = `/${path}`;

  try {
    const clothes = await Clothes.findById({ _id: clothes_id }); //->"_id"처럼 문자열로 넣어주어야 에러없이 동작

    await Clothes.updateOne(clothes, { fileUrl: path });
    res.redirect(routes.clothes_detail(id, clothes_id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Clothes Upload" });
};
export const postUpload = async (req, res) => {
  var {
    file: { path },
  } = req;
  const {
    body: { color, season, category, category_detail },
  } = req;
  console.log(color, season, category, category_detail);
  path = `/${path}`; //경로에 /가 없어서 이미지출력이안됨 이를 방지
  const newClothes = await Clothes.create({
    fileUrl: path,
    color,
    category,
    category_detail,
    season,
    creatorID: req.user.id,
  });
  console.log(newClothes.fileUrl);
  res.redirect(routes.closet(req.user.id));
};
//좀더 효율적으로 바꿔보기
export const getSummerCloset = async(req,res)=>{
  const {
    params:{id}
  }=req;
    try{
      const clothes = await Clothes.find({creatorID:id,season:"summer"})
      res.render("clothesShowing",{pageTitle:"summer",clothes})
    }catch(error){
      res.render("clothesShowing",{pageTitle:"summer",clothes:[]})

    }
}

export const getWinterCloset = async(req,res)=>{
  const {
    params:{id}
  }=req;
  try{
    const clothes = await Clothes.find({creatorID:id,season:"winter"})
    res.render("clothesShowing",{pageTitle:"winter",clothes})
  }catch(error){
    res.render("clothesShowing",{pageTitle:"winter",clothes:[]})

  }
}
export const getSpringfallCloset = async(req,res)=>{
  const {
    params:{id}
  }=req;
  try{
    const clothes = await Clothes.find({creatorID:id,season:"spring-fall"})
    res.render("clothesShowing",{pageTitle:"spring-fall",clothes})
  }catch(error){
    res.render("clothesShowing",{pageTitle:"spring-fall",clothes:[]})

  }
}
export const getShoesCloset = async(req,res)=>{
  const {
    params:{id}
  }=req;
  try{
    const clothes = await Clothes.find({creatorID:id,category:"shoes"})
    res.render("clothesShowing",{pageTitle:"shoes",clothes})
  }catch(error){
    res.render("clothesShowing",{pageTitle:"shoes",clothes:[]})

  }
}