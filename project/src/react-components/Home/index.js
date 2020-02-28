import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./styles.css";

/* Component for the Home page */
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleOnClick(e, role) {
        this.props.history.push({
            pathname: "/signin",
            state: {role: role}
        })
    }

    signInBox() {
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
            </div>);
    }

    postSignIn() {
        /*
        return (
            <div className="center" id='prompt'>
                Signed In
            </div>
        );*/
        if (this.state.role == "student") {
            return <Redirect to="/student"/>;
        } else if (this.state.role == "researcher") {
            return <Redirect to="/researcher"/>;
        } else {
            return <Redirect to="/administrator"/>
        }
        
    }

    render() {
        const hasSignIn = localStorage.getItem("hasSignIn");
        if (hasSignIn) {
            return this.postSignIn();
        } else {
            return this.signInBox();
        }
    }
}

export default withRouter(Home);