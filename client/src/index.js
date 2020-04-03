import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Header from "./react-components/Header";
import Home from "./react-components/Home";
import SignIn from "./react-components/SignIn";
import PostManagerPage from "./react-components/PostManagerPage/AllPosts";

import Profile from "./react-components/Profile/EditMode";
import ViewProfile from "./react-components/Profile/ViewMode"
import SignUp from "./react-components/SignUp";
import ApplicationForm from "./react-components/ApplicationForm";
import UserManagement from "./react-components/UserManagement";
import SignOut from "./react-components/SignOut";

function getSignInState() {
    const hasSignIn =
        localStorage.getItem("sessionId") ||
        sessionStorage.getItem("sessionId");
    return hasSignIn;
}

const routing = (
    <Router>
        <Header />
        <div>
            <Route path="/home" component={Home} />
            <Route
                path="/signin"
                component={() =>
                    getSignInState() ? <Redirect to="/home" /> : <SignIn />
                }
            />
            <Route
                path="/signout"
                component={() =>
                    getSignInState() ? <SignOut /> : <Redirect to="/home" />
                }
            />
            <Route
                path="/signup"
                component={() =>
                    getSignInState() ? <Redirect to="/home" /> : <SignUp />
                }
            />
            <Route
                path="/profile"
                component={() =>
                    getSignInState() ? <Profile /> : <Redirect to="/home" />
                }
            />
            <Route
                path="/view-profile"
                component={() =>
                    getSignInState() ? <ViewProfile /> : <Redirect to="/home" />
                }
            />
            <Route
                path="/manage-posting"
                component={() =>
                    getSignInState() ? (
                        <PostManagerPage />
                    ) : (
                        <Redirect to="/home" />
                    )
                }
            />
            <Route
                path="/application"
                component={() =>
                    getSignInState() ? (
                        <ApplicationForm />
                    ) : (
                        <Redirect to="/home" />
                    )
                }
            />
            <Route
                path="/user-manage"
                component={() =>
                    getSignInState() ? (
                        <UserManagement />
                    ) : (
                        <Redirect to="/home" />
                    )
                }
            />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
