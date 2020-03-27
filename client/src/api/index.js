import axios from "axios";
axios.defaults.withCredentials = true;
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
export const getSession = () => userApi.get("/session");
export const getUsers = () => userApi.get("/users");

export const getProfileByEmail = (emailAddress) =>
    profileApi.get(`/${emailAddress}`);
export const updateInterests = (payload) =>
    profileApi.put("/updateInterests", payload);
export const updateProfilePicture = (payload) =>
    profileApi.put("/updateProfilePicture", payload);
export const updateDescription = (payload) =>
    profileApi.put("/updateDescription", payload);
export const updateEmploymentInfo = (payload) =>
    profileApi.put("/updateEmploymentInfo", payload);

const apis = {
    createUser,
    authenticateUser,
    updatePassword,
    signOutUser,
    getSession,
    getProfileByEmail,
    updateInterests,
    updateProfilePicture,
    updateDescription,
    updateEmploymentInfo,
    getUsers
};

export default apis;
