import routes from "../routes";
import Cody from "../models/Cody";
import Clothes from "../models/Clothes";
//import mongodb from "mongodb"
//const ObjectId = mongodb.ObjectID
export const show_cody = async (req, res) => {
  try {
    const codies = await Cody.find({});
    res.render("show_cody", { pageTitle: "show cody", codies });
  } catch (error) {
    res.render("show_cody", { pageTitle: "show cody", codies: [] });
  }
};
export const cody_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const cody = await Cody.findById({ _id: id });
    var prev_cody = undefined;
    var next_cody = undefined;
    try {
      prev_cody = await Cody.find({ count: cody.count - 1 });
    } catch (error) {
      console.log("이전의 코디가 없습니다");
      prev_cody = undefined;
    }
    try {
      next_cody = await Cody.find({ count: cody.count + 1 });
    } catch (error) {
      console.log("다음 코디가 없습니다");
      next_cody = undefined;
    }
    if(prev_cody[0] === undefined && next_cody[0] !== undefined){
        res.render("cody_detail", {
            pageTitle: "detail cody",
            cody,
            prev_cody_id: null ,
            next_cody_id: next_cody[0]._id,
        });
    }else if(prev_cody[0] !== undefined && next_cody[0] === undefined){
        res.render("cody_detail", {
            pageTitle: "detail cody",
            cody,
            prev_cody_id: prev_cody[0]._id ,
            next_cody_id: null,
          });
    }else if(prev_cody[0] !== undefined && next_cody[0] !== undefined){
        res.render("cody_detail", {
            pageTitle: "detail cody",
            cody,
            prev_cody_id: prev_cody[0]._id ,
            next_cody_id: next_cody[0]._id ,
          });
    }
    
  } catch (error) {
    console.log(error);
    res.redirect(routes.show_cody);
  }
};
export const get_cody_recommend = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const clothes = await Clothes.find({ creatorID: id });
    res.render("cody_recommend", { pageTitle: "recommend", clothes });
  } catch (error) {
    res.render("cody_recommend", { pageTitle: "recommend", clothes: [] });
  }
};

export const post_cody_recommend = async (req, res) => {
  const {
    body: { clothes },
  } = req;
  try {
    const vetement = await Clothes.findById({ _id: clothes });

    if (vetement.category === "top") {
      try {
        const codiesFilter = await Cody.find({
          top_category_detail: vetement.category_detail,
        });
        try {
          const codiesRealFilter = await Cody.find({
            top_category_detail: vetement.category_detail,
            top_color: vetement.color,
          });
          res.render("recommended", {
            pageTitle: "result of recommend",
            codiesFilter,
            codiesRealFilter,
          });
        } catch (error) {
          console.log(error);
          console.log("같은 카테고리, 같은 색상을 찾다가 에러");
        }
      } catch (error) {
        console.log(error);
        console.log("같은 카테고리를 찾다가 에러");
      }

      /*var codiesFilter =codies.filter((item,index)=>{
                return vetement.category_detail === codies[index].top_category_detail
            })//cody데이터들 중 상의상세카테고리가 같은 경우만 배열에 남긴다.
            var codiesRealFilter = codiesFilter.filter((item,index)=>{
                console.log(codies[index].top_color)

                return vetement.color === codies[index].top_color;
            })*/
    } else if (vetement.category === "outer") {
      try {
        const codiesFilter = await Cody.find({
          outer_category_detail: vetement.category_detail,
        });
        try {
          const codiesRealFilter = await Cody.find({
            outer_category_detail: vetement.category_detail,
            outer_color: vetement.color,
          });
          res.render("recommended", {
            pageTitle: "result of recommend",
            codiesFilter,
            codiesRealFilter,
          });
        } catch (error) {
          console.log(error);
          console.log("같은 카테고리, 같은 색상을 찾다가 에러");
        }
      } catch (error) {
        console.log(error);
        console.log("같은 카테고리를 찾다가 에러");
      }
    } else if (vetement.category === "bottom") {
      try {
        const codiesFilter = await Cody.find({
          bottom_category_detail: vetement.category_detail,
        });
        try {
          const codiesRealFilter = await Cody.find({
            bottom_category_detail: vetement.category_detail,
            bottom_color: vetement.color,
          });
          res.render("recommended", {
            pageTitle: "result of recommend",
            codiesFilter,
            codiesRealFilter,
          });
        } catch (error) {
          console.log(error);
          console.log("같은 카테고리, 같은 색상을 찾다가 에러");
        }
      } catch (error) {
        console.log(error);
        console.log("같은 카테고리를 찾다가 에러");
      }
    } else if (vetement.category === "shoes") {
      try {
        const codiesFilter = await Cody.find({
          shoes_category_detail: vetement.category_detail,
        });
        try {
          const codiesRealFilter = await Cody.find({
            shoes_category_detail: vetement.category_detail,
            shoes_color: vetement.color,
          });
          res.render("recommended", {
            pageTitle: "result of recommend",
            codiesFilter,
            codiesRealFilter,
          });
        } catch (error) {
          console.log(error);
          console.log("같은 카테고리, 같은 색상을 찾다가 에러");
        }
      } catch (error) {
        console.log(error);
        console.log("같은 카테고리를 찾다가 에러");
      }
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const get_upload_cody = (req, res) => {
  res.render("upload_cody", { pageTitle: "upload your cody" });
};
export const post_upload_cody = async (req, res) => {
  var {
    file: { path },
  } = req;
  const {
    params: { id },
  } = req;
  var cody_length;
  var {
    body: {
      season,
      outer_color,
      outer_category_detail,
      top_color,
      top_category_detail,
      bottom_color,
      bottom_category_detail,
      shoes_color,
      shoes_category_detail,
      link,
    },
  } = req;
  console.log(
    season,
    outer_color,
    outer_category_detail,
    top_color,
    top_category_detail,
    bottom_color,
    bottom_category_detail,
    shoes_color,
    shoes_category_detail,
    link
  );

  path = `/${path}`;
  try {
    try {
      const cody = await Cody.find({});
      cody_length = cody.length;
      console.log(cody.length);
    } catch (error) {
      cody_length = 0;
      console.log("등록된 옷이 없습니다");
    }
    const newCody = await Cody.create({
      season,
      fileUrl: path,
      outer_color,
      outer_category_detail,
      top_color,
      top_category_detail,
      bottom_color,
      bottom_category_detail,
      shoes_color,
      shoes_category_detail,
      link,
      count: cody_length + 1,
    });
    console.log(newCody.count);
    res.redirect(routes.home);
  } catch (error) {
    res.redirect(routes.upload_cody(id));
  }
};
export const get_cody_edit = (req, res) => {
  const {
    params: { id },
  } = req;
  res.render("cody_edit", { pageTitle: "EDIT", id });
};
export const post_cody_edit = async (req, res) => {
  var {
    params: { id },
  } = req;

  var {
    body: {
      season,
      outer_color,
      outer_category_detail,
      top_color,
      top_category_detail,
      bottom_color,
      bottom_category_detail,
      shoes_color,
      shoes_category_detail,
    },
  } = req;
  //id = ObjectId.fromString(id);
  try {
    const cody = await Cody.findById({ _id: id });

    await cody.update({
      season,
      outer_color,
      outer_category_detail,
      top_color,
      top_category_detail,
      bottom_color,
      bottom_category_detail,
      shoes_color,
      shoes_category_detail,
    });
    res.redirect(routes.cody_detail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
