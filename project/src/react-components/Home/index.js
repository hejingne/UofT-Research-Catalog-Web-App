import React from "react";
import {} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./styles.css";

/* Component for the Home page */
class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div className="center" id='prompt'>
                Please select your user type to login:
                <ul>
                    <li><Link id="link" to={{
                        pathname: "./login",
                        state: {role: "student"}
                    }}
                    ><Button className="login__button center">STUDENT</Button></Link></li>
                    <li><Link id="link" to={{
                        pathname: "./login",
                        state: {role: "researcher"}
                    }}
                    > <Button className="login__button center" href="./login">RESEARCHER</Button></Link></li>
                    <li><Link id="link" to={{
                        pathname: "./login",
                        state: {role: "administrator"}
                    }}
                    ><Button className="login__button center" href="./login">ADMINISTRATOR</Button></Link></li>
                </ul>
            </div>
        );
    }
}

export default Home;