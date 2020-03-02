import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./styles.css";
import Dashboard from "../Dashboard";
import Chip from "@material-ui/core/Chip";
import DoneIcon from '@material-ui/icons/Done';
import InterestsChips from "../InterestsChips";


class Profile extends React.Component {

    constructor(props) {
        super(props);
        // this.handleOnClick = this.handleOnClick.bind(this);
        // this.displayContent = this.displayContent.bind(this);
        this.state = {
            personalInfo: {
                username: "USERNAME",
                description: "some personal description",
                profilePicture: require("./static/no-profile-picture-icon.png"),
            },
            selectedTab: "",
        };
    }

    handleOnClick(e) {
        this.setState({selectedTab: e.target.innerText})
    }

    displayContent() {
        if (!this.state.selectedTab){
            return null;
        }
        if (this.state.selectedTab === "DASHBOARD") {
            return <Dashboard/>;
        }
    }


    render() {

        return (
            <div>
                <div id="info">
                    <div id="basic-info">
                        <span id="username">{this.state.personalInfo.username}</span>
                        <span id="description">"{this.state.personalInfo.description}"</span>
                        <InterestsChips/>
                    </div>
                    <img id="profile-pic" src={this.state.personalInfo.profilePicture}/>
                </div>
                <div id="tabs">
                    <Button className="login__button" onClick={(e) => {
                        this.handleOnClick(e)
                    }}>DASHBOARD</Button>
                    <Button className="login__button" onClick={(e) => {
                        this.handleOnClick(e)
                    }}>POSTED APPLICATIONS</Button>
                    <Button className="login__button" onClick={(e) => {
                        this.handleOnClick(e)
                    }}>SUBMITTED APPLICATIONS</Button>
                </div>
                <div>
                    {this.displayContent()}
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);