import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dashboard from "../Dashboard";
import InterestsChips from "../InterestsChips";
import Applications from "../Applications";
import AccountSettings from "../AccountSettings";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { Done, Edit } from "@material-ui/icons";
import api from "../../api";

import "./styles.css";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClickEditDescription = this.handleOnClickEditDescription.bind(
            this
        );
        this.state = {
            userType: "",
            personalInfo: {
                firstName: "",
                lastName: "",
                description: "",
                profilePicture: null
            },
            selectedTab: "",
            editMode: false,
            mouseOver: false
        };
    }

    componentDidMount() {
        // connect to db to fetch and use this.setState() to update info
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        api.getSession(sessionId).then((response) => {
            if (response.data.success) {
                api.getProfileByEmail(response.data.user.emailAddress).then(
                    (res) => {
                        if (res.data.success) {
                            let imagePath = require("./static/no-profile-picture-icon.png");
                            if (res.data.data.profilePicture) {
                                const image = btoa(
                                    String.fromCharCode.apply(
                                        null,
                                        res.data.data.profilePicture.data.data
                                    )
                                );
                                imagePath = "data:image/png;base64," + image;
                            }

                            this.setState({
                                personalInfo: {
                                    firstName: res.data.data.firstName,
                                    lastName: res.data.data.lastName,
                                    description: res.data.data.description,
                                    profilePicture: imagePath
                                }
                            });
                            this.setState({ userType: res.data.data.userType });
                        }
                    }
                );
            } else {
                return this.props.history.push("/signOut");
            }
        });
    }

    handleOnClick(e) {
        this.setState({ selectedTab: e.target.innerText });
    }

    handleOnClickEditDescription() {
        if (!this.state.editMode) {
            this.setState({
                editMode: true,
                mouseOver: true
            });
        } else {
            this.setState({
                editMode: false,
                mouseOver: true
            });

            // call server to update description
            const sessionId = localStorage.getItem("sessionId")
                ? localStorage.getItem("sessionId")
                : sessionStorage.getItem("sessionId");
            api.getSession(sessionId).then((response) => {
                if (response.data.success) {
                    api.updateDescription({
                        emailAddress: response.data.user.emailAddress,
                        description: this.state.personalInfo.description
                    });
                } else {
                    return this.props.history.push("/signOut");
                }
            });
        }
    }

    displayContent() {
        if (!this.state.selectedTab) {
            return null;
        }
        if (this.state.selectedTab === "DASHBOARD") {
            return <Dashboard />;
        }
        if (this.state.selectedTab === "SUBMITTED APPLICATIONS") {
            return <Applications userType={"Student"} />;
        }
        if (this.state.selectedTab === "MANAGE POSTING") {
            this.props.history.push("/manage-posting");
        }
        if (this.state.selectedTab === "ACCOUNT SETTINGS") {
            return <AccountSettings />;
        }
    }

    render() {
        return (
            <div>
                <div id="info">
                    <div id="basic-info">
                        <span id="username">
                            {this.state.personalInfo.firstName +
                                " " +
                                this.state.personalInfo.lastName}
                        </span>
                        <TextField
                            fullWidth
                            id="description"
                            value={this.state.personalInfo.description}
                            margin="normal"
                            onChange={(e) => {
                                this.setState({
                                    personalInfo: {
                                        ...this.state.personalInfo,
                                        description: e.target.value
                                    }
                                });
                            }}
                            disabled={!this.state.editMode}
                            onMouseEnter={() => {
                                if (!this.state.mouseOver) {
                                    this.setState({ mouseOver: true });
                                }
                            }}
                            onMouseLeave={() => {
                                if (this.state.mouseOver) {
                                    this.setState({ mouseOver: false });
                                }
                            }}
                            InputProps={{
                                disableUnderline: !this.state.editMode,
                                endAdornment: this.state.mouseOver ? (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                this
                                                    .handleOnClickEditDescription
                                            }
                                        >
                                            {!this.state.editMode && <Edit />}
                                            {this.state.editMode && <Done />}
                                        </IconButton>
                                    </InputAdornment>
                                ) : (
                                    ""
                                )
                            }}
                        />
                        <InterestsChips />
                    </div>
                    <img
                        id="profile-pic"
                        src={this.state.personalInfo.profilePicture}
                    />
                </div>
                <div id="tabs">
                    <Button
                        className="login__button"
                        onClick={(e) => {
                            this.handleOnClick(e);
                        }}
                    >
                        DASHBOARD
                    </Button>
                    {this.state.userType === "Researcher" && (
                        <Button
                            className="login__button"
                            onClick={(e) => {
                                this.handleOnClick(e);
                            }}
                        >
                            MANAGE POSTING
                        </Button>
                    )}
                    {this.state.userType === "Student" && (
                        <Button
                            className="login__button"
                            onClick={(e) => {
                                this.handleOnClick(e);
                            }}
                        >
                            SUBMITTED APPLICATIONS
                        </Button>
                    )}
                    <Button
                        className="login__button"
                        onClick={(e) => {
                            this.handleOnClick(e);
                        }}
                    >
                        ACCOUNT SETTINGS
                    </Button>
                    <Divider />
                </div>
                <div>{this.displayContent()}</div>
            </div>
        );
    }
}

export default withRouter(Profile);
