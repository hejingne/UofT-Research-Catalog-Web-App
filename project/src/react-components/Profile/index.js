import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./styles.css";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const profilePictureUrl = require("./static/no-profile-picture-icon.png")

        return (
            <div>
                <div id="info">
                    <span id="username">User Name</span>
                    <img id="profile-pic" src={profilePictureUrl}/>
                </div>
                <div id='prompt'>
                        <li><Button className="login__button center" onClick={(e) => {
                            this.handleOnClick(e)
                        }}>STUDENT</Button></li>
                        <li><Button className="login__button center" onClick={(e) => {
                            this.handleOnClick(e)
                        }}>RESEARCHER</Button></li>
                        <li><Button className="login__button center" onClick={(e) => {
                            this.handleOnClick(e)
                        }}>ADMINISTRATOR</Button></li>
                </div>

            </div>
        );
    }
}

export default withRouter(Profile);