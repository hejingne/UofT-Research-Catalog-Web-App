import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dashboard from "../Dashboard";
import InterestsChips from "../InterestsChips";

import "./styles.css";
import Applications from "../Applications";
import AccountSettings from "../AccountSettings";
import Divider from "@material-ui/core/Divider";


class Profile extends React.Component {

    constructor(props) {
        super(props);
        // this.handleOnClick = this.handleOnClick.bind(this);
        // this.displayContent = this.displayContent.bind(this);
        this.state = {
            userType: localStorage.getItem("userType") ? localStorage.getItem("userType") : sessionStorage.getItem("userType"),
            personalInfo: {
                firstName: "Mike",
                lastName: "Oreo",
                description: "some personal description",
                profilePicture: require("./static/no-profile-picture-icon.png"),
            },
            selectedTab: "",
        };
    }

    componentDidMount() {
        // connect to db to fetch and use this.setState() to update info
    }

    handleOnClick(e) {
        this.setState({selectedTab: e.target.innerText})
    }

    displayContent() {
        if (!this.state.selectedTab) {
            return null;
        }
        if (this.state.selectedTab === "DASHBOARD") {
            return <Dashboard/>;
        }
        if (this.state.selectedTab === "SUBMITTED APPLICATIONS") {
            return <Applications userType={"Student"}/>;
        }
        if (this.state.selectedTab === "MANAGE POSTING") {
            this.props.history.push("/manage-posting");
        }
        if (this.state.selectedTab === "ACCOUNT SETTINGS") {
            return <AccountSettings/>;
        }
    }

    render() {
        return (
            <div>
                <div id="info">
                    <div id="basic-info">
                        <span id="username">{this.state.personalInfo.firstName+" "+this.state.personalInfo.lastName}</span>
                        <span id="description">"{this.state.personalInfo.description}"</span>
                        <InterestsChips/>
                    </div>
                    <img id="profile-pic" src={this.state.personalInfo.profilePicture}/>
                </div>
                <div id="tabs">
                    <Button className="login__button" onClick={(e) => {
                        this.handleOnClick(e)
                    }}>DASHBOARD</Button>
                    {this.state.userType === "Researcher" &&
                    <Button className="login__button" onClick={(e) => {
                        this.handleOnClick(e)
                    }}>MANAGE POSTING</Button>}
                    {this.state.userType === "Student" &&
                    <Button className="login__button" onClick={(e) => {
                        this.handleOnClick(e)
                    }}>SUBMITTED APPLICATIONS</Button>}
                    <Button className="login__button" onClick={(e) => {
                        this.handleOnClick(e)
                    }}>ACCOUNT SETTINGS</Button>
                    <Divider />
                </div>
                <div>
                    {this.displayContent()}
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);