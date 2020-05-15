import passport from "passport"
import User from "../models/User"
import routes from "../routes"
export const getLogin=(req,res)=>{
    res.render("login",{pageTitle:"login"});
}
export const postLogin= passport.authenticate('local',{    
    successRedirect: routes.home, //로그인 성공시 홈으로 이동한다.
    failureRedirect: routes.login, //로그인 실패시 로그인화면에 남아있는다
    failureFlash: 'Invalid username or password.'

})


export const getJoin=(req,res)=>{
    res.render("join",{pageTitle:"join"});

}
export const postJoin=async (req,res,next)=>{
    const{
        body:{name,email,birthday,address,password,password2}
    }=req; //form에서 입력한 데이터들은 바디에 저장되어있고 그걸 파싱해오는 코드 html태그의 name으로 저장되어있다.
    
    if(password != password2){
        res.status(400);
        res.render("join",{pageTitle:"join"});
    }else{
        try{
            const user = await User({
                name,
                email,
                birthday,//구현해야함
                address
            })//유저 모델(객체하나를 생성해준다)
            await User.register(user,password); // 그 객체를 User에 등록해준다
            console.log(user.name + `님이 가입하셨습니다.` + user.name+`님의 이메일은`+user.email);
            next();//미드웨어 이므로 넥스트함수 필요
        
        }catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
        
    }
}
export const logout = (req,res) =>{
    req.logout();
    req.session.destroy();
    res.clearCookie('sid');
    res.redirect(routes.home);
}

export const getMe = (req,res) =>{
    res.render("userDetail",{ pageTitle : "UserDetail", user: req.user})
}
export const userDetail = async(req,res)=>{
    const{
        params:{id}
    }=req;
    try{
        const user = await User.findById(id);
        res.render("userDetail",{pageTitle:"User Detail",user})
    }catch(error){
        console.log("해당 id는 존재하지않는 id입니다")
        res.redirect(routes.home);
    }

}

export const get_edit_profile = (req,res)=>{
    res.render("edit_profile",{pageTitle: "edit profile"})
}

export const post_edit_profile = async (req,res)=>{
    const {
        body:{name,email,address}
    }=req;
    console.log(name,email,address);
    try{
        await User.findByIdAndUpdate(req.user.id,{
            name,
            email,
            address
        })
        res.redirect(routes.me);
    }catch(error){
        console.log(error)
        res.render("edit_profile", { pageTitle: "Edit Profile" });

    }
    /*var{
        body:{name,email,birthday,address}
    }=req;
    const{
        params:{id}
    }=req;
    console.log(name,email,birthday,address);
    try {
        const user = await User.findById({_id:id});
        if (name === undefined) {
          name = user.name;
        }
        if (email === undefined) {
          email = user.email;
        }
        if (birthday === undefined) {
          birthday = user.birthday;
        }
        if (address === undefined) {
          address = user.address;
        }
        console.log(name,email,birthday,address)
        await  User.updateOne(user, {
          name,
          email,
          birthday,
          address,
        });
        console.log(user.name,user.email,user.birthday,user.address)

        res.redirect(routes.user_detail(id))
      }catch(error){
        console.log(error);
        res.redirect(routes.user_detail(id))
    }*/

    
}
export const change_password = (req,res)=>{
    res.render("change_password",{pageTitle: "change your password"})    
}







export const facebook_login = passport.authenticate("facebook");

export const facebook_login_callback = (accessToken,refreshToken,profile,cb)=>{
    console.log("accesstoken :"+accessToken,"refreshToken :"+
        refreshToken,
        "profile: "+profile
        ,"callback : "+cb);
}
export const postFacebookLogin = (req,res)=>{
    res.redirect(routes.home)
};