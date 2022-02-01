import axios from "axios";

export const signUp = (user) => {
    //return the axios promise object
    return axios.post('/api/1/users', user)
}

export const login = (user) => {
    //axios will send a post to /login
    //axios will include the authorization header: 
    //authrization: Basic BASE 64(username:password)
    return axios.post('/api/1/login', {}, {auth: user})
}