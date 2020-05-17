import routes from "../routes";
import Cody from "../models/Cody";
import Clothes from "../models/Clothes"
//import mongodb from "mongodb"
//const ObjectId = mongodb.ObjectID
export const show_cody = async(req,res)=>{
    try{
        const codies = await Cody.find({});
        res.render("show_cody",{pageTitle:"show cody",codies});

    }catch(error){
        res.render("show_cody",{pageTitle:"show cody",codies:[]});

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

        res.redirect(routes.show_cody);
    }
}
export const get_cody_recommend = async(req,res)=>{
    const{
        params:{id}
    }=req;
    
    try{
        const clothes = await Clothes.find({creatorID: id});
        res.render("cody_recommend",{pageTitle:"recommend",clothes})

    }catch(error){

        res.render("cody_recommend",{pageTitle:"recommend",clothes:[] })
    }

    
}

export const post_cody_recommend = async(req,res)=>{
    const {
        body:{clothes}
    }=req;
    const vetement = await Clothes.findById({_id:clothes});
    var codies = await Cody.find({});
    if(vetement.category === '상의'){
        var codiesFilter =codies.filter((item,index)=>{
            return vetement.category_detail === codies[index].top_category_detail
        })//cody데이터들 중 상의상세카테고리가 같은 경우만 배열에 남긴다.
        res.render("recommended",{pageTitle:"result of recommend",codiesFilter})


    }else if(vetement.category === '아우터'){

    }else if(vetement.category === '하의'){

    }else if(vetement.category === '신발'){

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
        params:{id}
    }=req;
    var{
        body:{
            season,
            outer_color,
            outer_category,
            outer_category_detail,
            top_color,
            top_category,
            top_category_detail,
            bottom_color,
            bottom_category,
            bottom_category_detail,
            shoes_color,
            shoes_category,
            shoes_category_detail,
        }

    }=req;
    console.log(
        season,
        outer_color,
        outer_category,
        outer_category_detail,
        top_color,
        top_category,
        top_category_detail,
        bottom_color,
        bottom_category,
        bottom_category_detail,
        shoes_color,
        shoes_category,
        shoes_category_detail
    );
    
    path = `/${path}`;
    try{
        const newCody = await Cody.create({
            season,
            fileUrl:path,
            outer_color,
            outer_category,
            outer_category_detail,
            top_color,
            top_category,
            top_category_detail,
            bottom_color,
            bottom_category,
            bottom_category_detail,
            shoes_color,
            shoes_category,
            shoes_category_detail,
        })
        console.log(newCody.fileUrl);
    
        res.redirect(routes.home)
    
    }catch(error){

        res.redirect(routes.upload_cody(id))
    }
        
}
export const get_cody_edit=(req,res)=>{
    const{
        params:{id}
    }=req;
    res.render("cody_edit",{pageTitle:"EDIT",id})
}
export const post_cody_edit= async(req,res)=>{
    var{
        params:{id}
    }=req;

    const{
        body:{season,outer}
    }=req;
    //id = ObjectId.fromString(id);
        try{
            const cody = await Cody.findById({_id:id})
    
            await cody.update({season})
            if(outer==="none"){
                console.log("아우터가 사실 없다를 고르셨습니다.");
                await cody.update({
                    outer_category_detail:undefined,
                    outer_category:undefined,
                    outer_color:undefined})
            }
            res.redirect(routes.cody_detail(id));
        }catch(error){
            res.redirect(routes.home);
        }
   
    
}