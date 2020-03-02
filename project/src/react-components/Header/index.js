import React from 'react';
import {Link, Redirect, withRouter} from "react-router-dom";
import {Container, Nav} from 'react-bootstrap'
import {MDBCol} from "mdbreact";


import './styles.css'
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.redirectToHome = this.redirectToHome.bind(this);
        this.state = {
            menuOpenState: false,
            anchorEl: null,
        };
    }

    handleOnClickMenuIcon(e) {
        this.setState({menuOpenState: true});
        this.setState({anchorEl: e.target});
    }

    handleSelectMenuOption(e) {
        const selectedOption = e.target.innerText;
        if (selectedOption === "Sign Out") {
            localStorage.removeItem("hasSignIn");
            sessionStorage.removeItem("hasSignIn");
            this.redirectToHome();
        }
        if (selectedOption === "My Profile") {
            this.props.history.push("/profile");
        }
        this.setState({menuOpenState: false});
    }

    redirectToHome() {
        this.props.history.push("/home");
    }

    render() {
        const logoUrl = require("./static/uoft-logo.png")
        const options = ["My Profile", "Sign Out"];
        const hasSignIn = (localStorage.getItem("hasSignIn") === "true")
            || (sessionStorage.getItem("hasSignIn") === "true");

        return (<div id="banner">
            <img id="logo" src={logoUrl} onClick={this.redirectToHome}/>
            <span id="title" onClick={this.redirectToHome}>U of T Research Catalogue</span>
            {hasSignIn &&
            <div id="menu-btn">
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(e) => this.handleOnClickMenuIcon(e)}>
                    <MenuIcon id="menu-btn-icon"/>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={this.state.menuOpenState}
                    onClose={() => this.setState({menuOpenState: false})}
                    PaperProps={{
                        style: {
                            maxHeight: 48 * 4.5,
                            width: 200,
                        },
                    }}
                >
                    {options.map((option) =>
                        <MenuItem key={option} selected={option === "Pyxis"} onClick={(e) => {
                            this.handleSelectMenuOption(e)
                        }}>{option} </MenuItem>
                    )}
                </Menu>
            </div>}
        </div>);
    }
}

export default withRouter(Header);

