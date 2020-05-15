import routes from "../routes";
import Cody from "../models/Cody";

export const show_cody = async(req,res)=>{
    try{
        const codies = await Cody.find({});
        res.render("show_cody",{pageTitle:"show cody",codies});

    }catch(error){
        console.log(error);
        res.redirect(routes.home);
    }
}
export const cody_detail = async(req,res)=>{
    const{
        params:{id}
    }=req;
    try{
        const cody = await Cody.findById({_id:id});
        res.render("cody_detail",{pageTitle:"detail cody",cody})
    }catch(error){
        console.log(error);
        res.redirect(routes.show_cody);
    }
}
export const get_upload_cody=(req,res)=>{
    res.render("upload_cody",{pageTitle:"upload your cody"})
}
export const post_upload_cody=async(req,res)=>{
    var {
        file: { path },
      } = req;
    const{
        body:{
            outer_color,
            outer_season,
            outer_category,
            outer_category_detail,
            top_color,
            top_season,
            top_category,
            top_category_detail,
            bottom_color,
            bottom_season,
            bottom_category,
            bottom_category_detail,
            shoes_color,
            shoes_season,
            shoes_category,
            shoes_category_detail,
        }

    }=req;
    console.log(outer_color,
        outer_season,
        outer_category,
        outer_category_detail,
        top_color,
        top_season,
        top_category,
        top_category_detail,
        bottom_color,
        bottom_season,
        bottom_category,
        bottom_category_detail,
        shoes_color,
        shoes_season,
        shoes_category,
        shoes_category_detail
    );
    path = `/${path}`;
    const newCody = await Cody.create({
        fileUrl:path,
        outer_color,
        outer_season,
        outer_category,
        outer_category_detail,
        top_color,
        top_season,
        top_category,
        top_category_detail,
        bottom_color,
        bottom_season,
        bottom_category,
        bottom_category_detail,
        shoes_color,
        shoes_season,
        shoes_category,
        shoes_category_detail,
    })
    console.log(newCody.fileUrl);

    res.redirect(routes.home)
    
}