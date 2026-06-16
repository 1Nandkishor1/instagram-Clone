import axios from 'axios';

let api=axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials:true
})

export async function login(username,password){
    let responce=await api.post('/login',{username,password})
    return responce.data
}

export async function register(username,email,password){
    let responce=await api.post('/register',{username,email,password})
    return responce.data;
}

export async function getme(){
    let responce=await api.post('/getme')
    return responce.data;
}

