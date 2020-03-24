import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/user"
});

export const createUser = (payload) => api.post("/create", payload);
export const authenticateUser = (payload) => api.post("/authenticate", payload);
export const updatePassword = (payload) => api.put("/updatePassword", payload);
export const signOutUser = () => api.get("/signOut");

const apis = {
    createUser,
    authenticateUser,
    updatePassword,
    signOutUser
};

export default apis;
