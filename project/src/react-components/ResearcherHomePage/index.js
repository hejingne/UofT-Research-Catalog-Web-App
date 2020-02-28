import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";

class ResearcherHomePage extends React.Component {
    render() {
        return <div id='prompt' className="center">Reseacher Home Page</div>
    }
}

export default withRouter(ResearcherHomePage);