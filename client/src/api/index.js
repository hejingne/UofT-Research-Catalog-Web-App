import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:3001/user"
});

const profileApi = axios.create({
    baseURL: "http://localhost:3001/profile"
});

export const createUser = (payload) => userApi.post("/create", payload);
export const authenticateUser = (payload) =>
    userApi.post("/authenticate", payload);
export const updatePassword = (payload) =>
    userApi.put("/updatePassword", payload);
export const signOutUser = () => userApi.get("/signOut");

export const getProfileByEmail = (emailAddress) =>
    profileApi.get(`/${emailAddress}`);

const apis = {
    createUser,
    authenticateUser,
    updatePassword,
    signOutUser
};

export default apis;
