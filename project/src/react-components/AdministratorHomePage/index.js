import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";

class AdministratorHomePage extends React.Component {
    render() {
        return <div id='prompt' className="center">Administrator Home Page</div>
    }
}

export default withRouter(AdministratorHomePage);