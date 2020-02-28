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

    
    handleOnClick(e) {
        this.props.history.push({
            pathname: "/signin",
            state: {role: e.target.innerText}
        })
    }

    signInBox() {
        return (
            <div className="center" id='prompt'>
                Please select your user type to login:
                <ul>
                    <li><Button className="login__button center" onClick={(e) => {
                        this.handleOnClick(e)
                    }}>STUDENT</Button></li>
                    <li><Button className="login__button center" onClick={(e) => {
                        this.handleOnClick(e)
                    }}>RESEARCHER</Button></li>
                    <li><Button className="login__button center" onClick={(e) => {
                        this.handleOnClick(e)
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
        // temporarily only directing to student home page
        return <Redirect to="/student"/>;

        
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