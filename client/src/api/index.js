import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001/user',
})

export const createUser = payload => api.post("/create", payload);
export const validateUser = () => api.get("/validate");

const apis = {
    createUser,
    validateUser
}

export default apis