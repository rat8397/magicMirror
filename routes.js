const HOME = "/";
const LOGIN = "/login"
const JOIN = "/join"
const LOGOUT = "/logout"
const SHOW_CODY = "/show_cody"



const USERS = "/users"
const USER_DETAIL = "/users/:id"
const EDIT_PROFILE = "/users/:id/edit-profile"
const CHANGE_PASSWORD = "/users/change-password"
const ME = "/users/me"
const CLOSET = "/users/:id/closet"
const UPLOAD = "/users/:id/closet/upload"
const EDIT = "/users/:id/closet/edit"
const CLOTHES_DELETE = "/users/:id/closet/clothes_delete"
//facebook login
const FACEBOOK_LOGIN = "/auth/facebook"
const FACEBOOK_LOGIN_CALLBACK = "/auth/facebook/callback"

const routes = {
    home : HOME,
    join : JOIN,
    login: LOGIN,
    logout : LOGOUT,
    users:USERS,
    test:'/test',
    user_detail : id=>{
        if(id){
            return `/users/${id}`

        }else{
            return USER_DETAIL
        }
    },
    clothes_detail: (id, clothes_id)=>{
        if(id){
            var path = `/users/${id}/closet/:clothes_id`
            if(clothes_id){
                path = `/users/${id}/closet/${clothes_id}`
                return path;
            }else{
                return path;
            }

        }else{
            return `/users/:id/closet/:clothes_id`
        }
    },
    edit_clothes_info:(id,clothes_id)=>{
        if(id){
            var path = `/users/${id}/closet/:clothes_id/edit_clothes_info`
            if(clothes_id){
                path = `/users/${id}/closet/${clothes_id}/edit_clothes_info`
                return path;
            }else{
                return path;
            }
        }else{
            return `/users/:id/closet/:clothes_id/edit_clothes_info`
        }
    },
    edit_clothes_img:(id,clothes_id)=>{
        if(id){
            var path = `/users/${id}/closet/:clothes_id/edit_clothes_img`
            if(clothes_id){
                path = `/users/${id}/closet/${clothes_id}/edit_clothes_img`
                return path;
            }else{
                return path;
            }
        }else{
            return `/users/:id/closet/:clothes_id/edit_clothes_img`
        }
    },
    clothes_delete:id=>{
        if(id){
            return `/users/${id}/closet/clothes_delete`
        }else{
            return CLOTHES_DELETE
        }
    },
    
    closet : id=>{

        if(id){
            return `/users/${id}/closet`
        }else{
            return CLOSET;
        }
    },
    upload : id=>{
        if(id){
            return `/users/${id}/closet/upload`
        }else{
            return UPLOAD;
        }
    },
    upload_cody: id=>{
        if(id){
            return `/users/${id}/upload_cody`
        }else{
            return `/users/:id/upload_cody`
        }
    },
    show_cody:SHOW_CODY,
    edit: id=>{
        if(id){
            return `/users/${id}/closet/edit`
        }else{
            return EDIT;
        }
    },
    edit_profile: id=>{
        if(id){
            return `/users/${id}/edit-profile`

        }else{

            return EDIT_PROFILE
        }
    },
    cody_detail:id=>{
        if(id){
            return `/${id}/cody_detail`
        }else{
            return `/:id/cody_detail`
        }
    },
    cody_edit:id=>{
        if(id){
            return `/${id}/cody_edit`
        }else{
            return `/:id/cody_edit`
        }
    },
    cody_recommend:id=>{
        if(id){
            return `/${id}/cody_recommend`
        }else{
            return `/:id/cody_recommend`
        }

    },
    change_password:CHANGE_PASSWORD,
    me : ME,

    facebook_login : FACEBOOK_LOGIN,
    facebook_login_callback : FACEBOOK_LOGIN_CALLBACK,
}
export default routes;


