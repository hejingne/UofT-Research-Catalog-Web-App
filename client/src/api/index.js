import axios from "axios";
axios.defaults.withCredentials = true;

const port = process.env.PORT || 3001;

let originUrl;

if (process.env.NODE_ENV === "production") {
    originUrl = "https://uoftresearchcatalogue.herokuapp.com";
} else {
    originUrl = "http://localhost:" + port;
}

const userApi = axios.create({
    baseURL: originUrl + "/api/user"
});

const profileApi = axios.create({
    baseURL: originUrl + "/api/profile"
});

const applicationApi = axios.create({
    baseURL: originUrl + "/api/application"
});

const postingApi = axios.create({
    baseURL: originUrl + "/api/manage-posting"
});


export const getAllResearches = () => postingApi.get("/postings");

export const startMakingPosts = (payload) => postingApi.post("/postings", payload);
export const getResearcherByEmail = (email) => postingApi.get(`/${email}`);
export const createPostForResearcher = (payload) => postingApi.post("/createPosting", payload);
export const deletePostForResearcher = (id, index) => postingApi.delete(`/deletePosting/${id}/${index}`);
export const editPost = (payload) => postingApi.put("/updatePosting", payload);
export const updateIndexForResearcher = (id, index) => postingApi.patch(`/updateIndex/${id}/${index}`);
export const restorePostForResearcher = (id, index) => postingApi.delete(`/restorePosting/${id}/${index}`);

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
    startMakingPosts,
    getResearcherByEmail,
    createPostForResearcher,
    deletePostForResearcher,
    updateIndexForResearcher,
    restorePostForResearcher,
    editPost,
    
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
    offerApplication,
    getAllResearches
};

export default apis;
