import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Nav} from 'react-bootstrap'
import {MDBCol} from "mdbreact";

import './styles.css'

class Header extends React.Component {

    render() {
        const logoUrl = require("./static/uoft-logo.png")

        return (
            <div id="banner">
                <img id="logo" src={logoUrl} onClick={() => {
                    window.location.href = "./home"
                }}/>
                <span id="title" onClick={() => {
                    window.location.href = "./home"
                }}>U of T Research Catalogue</span>
            </div>
        );
    }
}

export default Header;

