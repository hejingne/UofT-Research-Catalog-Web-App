import React from 'react';
import {Container, Nav} from 'react-bootstrap'
import {MDBCol} from "mdbreact";

import './styles.css'

class Header extends React.Component {

    render() {
        const logoUrl = require("./static/uoft-logo.png")

        return (
            <div id="banner">
                <img id="logo" src={logoUrl}/>
                <span id="title">U of T Research Catalogue</span>
            </div>
        );
    }
}

export default Header;

