import React from "react";
import { Redirect, withRouter } from "react-router-dom";

import apis from "../../../api";

class SignOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        localStorage.removeItem("sessionId");
        sessionStorage.removeItem("sessionId");
        apis.signOutUser();

        return <Redirect to="/home" />;
    }
}

export default withRouter(SignOut);
