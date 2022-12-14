import React from "react";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import api from "../../api";

import "./styles.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.redirectToHome = this.redirectToHome.bind(this);
        this.state = {
            menuOpenState: false,
            anchorEl: null,
            userType: ""
        };
    }

    componentDidMount() {
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        api.getSession(sessionId).then((res) => {
            if (!res.data.success) {
                return this.props.history.push("/signOut");
            }
            this.setState({ userType: res.data.user.userType });
        });
    }

    handleOnClickMenuIcon(e) {
        this.setState({ menuOpenState: true });
        this.setState({ anchorEl: e.target });
    }

    handleSelectMenuOption(e) {
        const selectedOption = e.target.innerText;
        if (selectedOption === "Home") {
            this.props.history.push("/home");
        }
        if (selectedOption === "My Profile") {
            this.props.history.push("/profile");
        }
        if (selectedOption === "Application Status") {
            this.props.history.push("/manage-posting");
        }
        if (selectedOption === "Sign Out") {
            this.props.history.push("/signout");
        }
        if (selectedOption === "Manage Users") {
            this.props.history.push("/user-manage");
        }
        this.setState({ menuOpenState: false });
    }

    redirectToHome() {
        this.props.history.push("/home");
    }

    render() {
        const logoUrl = require("./static/uoft-logo.png");
        const options = ["Home", "My Profile", "Sign Out"];
        const adminOptions = ["Home", "My Profile", "Manage Users", "Sign Out"];
        const hasSignIn =
            localStorage.getItem("sessionId") ||
            sessionStorage.getItem("sessionId");

        let menuOptions =
            this.state.userType === "Administrator" ? adminOptions : options;

        return (
            <div id="banner">
                <img
                    id="logo"
                    alt=""
                    src={logoUrl}
                    onClick={this.redirectToHome}
                />
                <span id="title" onClick={this.redirectToHome}>
                    U of T Research Catalogue
                </span>
                {hasSignIn && (
                    <div id="menu-btn">
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={(e) => this.handleOnClickMenuIcon(e)}
                        >
                            <MenuIcon id="menu-btn-icon" />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={this.state.menuOpenState}
                            onClose={() =>
                                this.setState({ menuOpenState: false })
                            }
                            PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: 200
                                }
                            }}
                        >
                            {menuOptions.map((option) => (
                                <MenuItem
                                    key={option}
                                    selected={option === "Pyxis"}
                                    onClick={(e) => {
                                        this.handleSelectMenuOption(e);
                                    }}
                                >
                                    {option}{" "}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Header);
