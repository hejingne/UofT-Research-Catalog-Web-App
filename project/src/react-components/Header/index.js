import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Nav} from 'react-bootstrap'
import {MDBCol} from "mdbreact";

import './styles.css'

class Header extends React.Component {

    render() {
        const logoUrl = require("./static/uoft-logo.png")

        return (
            <div id="banner" onClick={() => {window.location.href = "./home"}}>
                <img id="logo" src={logoUrl}/>
                <span id="title">U of T Research Catalogue</span>
            </div>
        );
    }
}

export default Header;

