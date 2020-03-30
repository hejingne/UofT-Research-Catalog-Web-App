import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import HomePage from "../HomePage";
import apis from "../../api";

import "./styles.css";

/* Component for the Home page */
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: ""
        };
        this.handleOnClick.bind(this);
    }

    componentDidMount() {
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        if (sessionId) {
            apis.getSession(sessionId).then((response) => {
                if (!response.data.success) {
                    return this.props.history.push("/signOut");
                }
                this.setState({ userType: response.data.user.userType });
            });
        }
    }

    handleOnClick(e) {
        const role = e.target.innerText;
        this.props.history.push({
            pathname: "/signin",
            state: {
                role: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
            }
        });
    }

    signInBox() {
        return (
            <div className="center" id="prompt">
                Please select your user type to login:
                <ul>
                    <li>
                        <Button
                            id="student"
                            className="login__button center"
                            onClick={(e) => {
                                this.handleOnClick(e);
                            }}
                        >
                            STUDENT
                        </Button>
                    </li>
                    <li>
                        <Button
                            className="login__button center"
                            onClick={(e) => {
                                this.handleOnClick(e);
                            }}
                        >
                            RESEARCHER
                        </Button>
                    </li>
                    <li>
                        <Button
                            className="login__button center"
                            onClick={(e) => {
                                this.handleOnClick(e);
                            }}
                        >
                            ADMINISTRATOR
                        </Button>
                    </li>
                </ul>
            </div>
        );
    }

    postSignIn() {
        return <HomePage userType={this.state.userType} />;
    }

    render() {
        const hasSignIn =
            localStorage.getItem("sessionId") ||
            sessionStorage.getItem("sessionId");

        if (hasSignIn) {
            return this.postSignIn();
        } else {
            return this.signInBox();
        }
    }
}

export default withRouter(Home);
