import React from 'react';
import {Link, Redirect, withRouter} from "react-router-dom";
import {Container, Nav} from 'react-bootstrap'
import {MDBCol} from "mdbreact";

import './styles.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.redirectToHome = this.redirectToHome.bind(this);
        this.signOut = this.signOut.bind(this);
        this.state = {};
    }

    redirectToHome() {
        this.props.history.push("/home");
    }

    signOut() {
        localStorage.removeItem("hasSignIn");
        this.redirectToHome();
    }

    render() {
        const logoUrl = require("./static/uoft-logo.png")

        const hasSignIn = localStorage.getItem("hasSignIn");
        if (hasSignIn) {
            return (<div id="banner">
                <img id="logo" src={logoUrl} onClick={this.redirectToHome}/>
                <span id="title" onClick={this.redirectToHome}>U of T Research Catalogue</span>
                <span id="sign-out-btn" onClick={this.signOut}>Sign Out</span>
            </div>);
        } else {
            return (<div id="banner">
                <img id="logo" src={logoUrl} onClick={this.redirectToHome}/>
                <span id="title" onClick={this.redirectToHome}>U of T Research Catalogue</span>
            </div>);
        }

    }
}

export default withRouter(Header);

