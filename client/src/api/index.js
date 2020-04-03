import axios from "axios";
axios.defaults.withCredentials = true;
const userApi = axios.create({
    baseURL: "http://localhost:3001/user"
});

const profileApi = axios.create({
    baseURL: "http://localhost:3001/profile"
});

const applicationApi = axios.create({
    baseURL: "http://localhost:3001/application"
});

export const createUser = (payload) => userApi.post("/create", payload);
export const authenticateUser = (payload) =>
    userApi.post("/authenticate", payload);
export const updatePassword = (payload) =>
    userApi.put("/updatePassword", payload);
export const updateEmailAddressAndUserType = (payload) =>
    userApi.put("/updateEmailAddressAndUserType", payload);
export const signOutUser = () => userApi.get("/signOut");
export const getSession = (sessionId) => userApi.get(`/session/${sessionId}`);
export const getUsers = () => userApi.get("/users");
export const deleteUserAndProfile = (emailAddress) =>
    userApi.delete(`/delete/${emailAddress}`);

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

export const getApplications = () => applicationApi.get("/applications");
export const createApplications = (payload) =>
    applicationApi.post("/create", payload);
export const deleteApplicationById = (id) =>
    applicationApi.delete(`/delete/${id}`);
export const getApplicationsByEmail = (emailAddress) =>
    applicationApi.get(`/applications/${emailAddress}`);
export const getApplicationsByResearchId = (researchId) =>
    applicationApi.get(`/applications/researchId/${researchId}`);
export const acceptApplication = (id) => applicationApi.patch(`/accept/${id}`);
export const rejectApplication = (id) => applicationApi.patch(`/reject/${id}`);
export const reviewApplication = (id) => applicationApi.patch(`/review/${id}`);
export const offerApplication = (id) => applicationApi.patch(`/offer/${id}`);

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
    getUsers,
    deleteUserAndProfile,
    updateEmailAddressAndUserType,
    getApplications,
    createApplications,
    deleteApplicationById,
    getApplicationsByEmail,
    getApplicationsByResearchId,
    acceptApplication,
    rejectApplication,
    reviewApplication,
    offerApplication
};

export default apis;
