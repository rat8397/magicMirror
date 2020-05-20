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
    try{
        const vetement = await Clothes.findById({_id:clothes});
        var codies = await Cody.find({});
        if(vetement.category === 'top'){
            var codiesFilter =codies.filter((item,index)=>{
                return vetement.category_detail === codies[index].top_category_detail
            })//cody데이터들 중 상의상세카테고리가 같은 경우만 배열에 남긴다.
            var codiesRealFilter = codiesFilter.filter((item,index)=>{
                console.log(codies[index].top_color)

                return vetement.color === codies[index].top_color;
            })
    
            res.render("recommended",{pageTitle:"result of recommend",codiesFilter,codiesRealFilter})
    
    
        }else if(vetement.category === 'outer'){
    
        }else if(vetement.category === 'bottom'){
    
        }else if(vetement.category === 'shoes'){
    
        }
    }catch(error){
        res.redirect(routes.home);
        
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
            outer_category_detail,
            top_color,
            top_category_detail,
            bottom_color,
            bottom_category_detail,
            shoes_color,
            shoes_category_detail,
        }

    }=req;
    console.log(
        season,
        outer_color,
        outer_category_detail,
        top_color,
        top_category_detail,
        bottom_color,
        bottom_category_detail,
        shoes_color,
        shoes_category_detail
    );
    
    path = `/${path}`;
    try{
        const newCody = await Cody.create({
            season,
            fileUrl:path,
            outer_color,
            outer_category_detail,
            top_color,
            top_category_detail,
            bottom_color,
            bottom_category_detail,
            shoes_color,
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

    var{
        body:{
            
            season,
            outer_color,
            outer_category_detail,
            top_color,
            top_category_detail,
            bottom_color,
            bottom_category_detail,
            shoes_color,
            shoes_category_detail,
        }

    }=req;
    //id = ObjectId.fromString(id);
        try{
            const cody = await Cody.findById({_id:id})
            
            


            await cody.update({season,
                outer_color,
                outer_category_detail,
                top_color,
                top_category_detail,
                bottom_color,
                bottom_category_detail,
                shoes_color,
                shoes_category_detail,
            })
            res.redirect(routes.cody_detail(id));
        }catch(error){
            res.redirect(routes.home);
        }
   
    
}