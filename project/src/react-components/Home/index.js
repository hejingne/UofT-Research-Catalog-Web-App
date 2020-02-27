import React from "react";
import { } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./styles.css";

/* Component for the Home page */
class Home extends React.Component {
    render() {
        return (
            <div className="center" id='prompt'>
                Please select your user type to login:
                <ul>
                    <li><Button className="login__button center" href="./login">STUDENT</Button></li>
                    <li><Button className="login__button center" href="./login">RESEARCHER</Button></li>
                    <li><Button className="login__button center" href="./login">ADMINISTRATOR</Button></li>
                </ul>
            </div>
        );
    }
}

export default Home;