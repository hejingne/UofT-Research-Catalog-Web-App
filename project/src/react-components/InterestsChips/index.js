import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Chip from "@material-ui/core/Chip";

import "./styles.css";
import {Add} from "@material-ui/icons";


class InterestsChips extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleDelete(e) {

    }

    handleOnClick(e) {
    }

    render() {

        return (
            <div id="interests">
                <Chip
                    className="interest"
                    size="small"
                    label="interest 1"
                    onClick={this.handleOnClick}
                    onDelete={this.handleDelete}
                />
                <Chip
                    className="interest"
                    size="small"
                    label="interest 2"
                    onClick={this.handleOnClick}
                    onDelete={this.handleDelete}
                />
                <Chip
                    className="interest"
                    size="small"
                    label="interest 3"
                    onClick={this.handleOnClick}
                    onDelete={this.handleDelete}
                />
                <Chip
                    className="interest"
                    size="small"
                    icon={<Add/>}
                    onClick={this.handleOnClick}
                />
            </div>
        );
    }
}

export default withRouter(InterestsChips);