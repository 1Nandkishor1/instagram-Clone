import axios  from "axios";
import { toFormData } from "axios";

let api=axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
})

export async function getfeed(){
    let responce= await api.get('/post/feed')
    console.log(responce.data);
    return responce.data;
}

export async function createpost(image,caption){
    let formdata=new FormData();
    formdata.append('image',image)
    formdata.append('caption',caption)

    let responce=await api.post('/post',formdata)
    return responce.data;
}

export async function likepost(postid,username){
    let responce=await api.post('/user/like/'+postid,username);
    return responce.data

}

export async function unlikepost(postid,username){
    let responce=await api.post('/user/unlike/'+postid,username);
    return responce.data
}
export async function followrequest(followee){
    let responce=await api.post('/user/followrequest/'+followee);
    console.log(responce.data)

    return responce.data
}
export async function unfollowuser(followee){
    let responce=await api.post('/user/unfollow/'+followee);
    return responce.data
}

export async function followerslist(){
    let responce=await api.post('/user/followers/');
    return responce.data
}

export async function followinglist(){
    let responce=await api.post('/user/following/');
    return responce.data
}







