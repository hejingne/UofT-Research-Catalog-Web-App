import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./styles.css";

/* Component for the Home page */
class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }

    handleOnClick(e, role) {
        this.props.history.push({
            pathname: "./login",
            state: {role: role}
        })
    }

    render() {
        return (
            <div className="center" id='prompt'>
                Please select your user type to login:
                <ul>
                    <li><Button className="login__button center" onClick={(e) => {
                        this.handleOnClick(e, "student")
                    }}>STUDENT</Button></li>
                    <li><Button className="login__button center" onClick={(e) => {
                        this.handleOnClick(e, "researcher")
                    }}>RESEARCHER</Button></li>
                    <li><Button className="login__button center" onClick={(e) => {
                        this.handleOnClick(e, "administrator")
                    }}>ADMINISTRATOR</Button></li>
                </ul>
            </div>
        );
    }
}

export default Home;