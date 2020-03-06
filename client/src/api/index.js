import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001/user',
})

export const createUser = (payload) => api.post("/create", payload);
export const validateUser = (payload) => api.post("/validate", payload);

const apis = {
    createUser,
    validateUser
}

export default apis