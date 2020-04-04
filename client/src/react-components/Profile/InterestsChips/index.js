import React from "react";
import { withRouter } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { Add } from "@material-ui/icons";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import api from "../../../api";

import "./styles.css";

class InterestsChips extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddInterest = this.handleAddInterest.bind(this);
        this.state = {
            interests: [],
            newInterest: "",
            modalOpenState: false
        };
    }

    componentDidMount() {
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");

        // connect to db to fetch and use this.setState() to update interests
        api.getSession(sessionId).then((response) => {
            if (!response.data.success) {
                return this.props.history.push("/signOut");
            }
            api.getProfileByEmail(response.data.user.emailAddress).then(
                (res) => {
                    if (res.data.success) {
                        this.setState({
                            interests: res.data.data.interests
                        });
                    }
                }
            );
        });
    }

    handleDeleteInterest(e) {
        const interest = e.target.parentElement.parentElement.innerText;
        const updatedInterests = this.state.interests.filter(
            (element) => element !== interest
        );
        this.setState({ interests: updatedInterests });
        // connect to db to update interests
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        api.getSession(sessionId).then((response) => {
            if (!response.data.success) {
                return this.props.history.push("/signOut");
            }
            api.updateInterests({
                emailAddress: response.data.user.emailAddress,
                interests: this.state.interests
            });
        });
    }

    handleAddInterest() {
        this.setState({ modalOpenState: false });
        const interest = this.state.newInterest;
        const existInterests = this.state.interests;
        // check existent and uniqueness
        if (
            interest &&
            existInterests.filter((element) => element === interest).length ===
                0
        ) {
            existInterests.push(interest);
            this.setState({ interests: existInterests });
            this.setState({ newInterest: "" });
            // connect to db to update interests
            const sessionId = localStorage.getItem("sessionId")
                ? localStorage.getItem("sessionId")
                : sessionStorage.getItem("sessionId");
            api.getSession(sessionId).then((response) => {
                if (!response.data.success) {
                    return this.props.history.push("/signOut");
                }
                api.updateInterests({
                    emailAddress: response.data.user.emailAddress,
                    interests: this.state.interests
                });
            });
        }
    }

    render() {
        return (
            <div id="interests">
                {this.state.interests.map((element) => {
                    return (
                        <Chip
                            className="interest"
                            size="small"
                            label={element}
                            onDelete={(e) => this.handleDeleteInterest(e)}
                        />
                    );
                })}
                <Chip
                    className="interest"
                    size="small"
                    icon={<Add />}
                    onClick={() => this.setState({ modalOpenState: true })}
                />
                <Dialog
                    open={this.state.modalOpenState}
                    onClose={() => this.setState({ modalOpenState: false })}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Please Enter Your Interest:{" "}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            variant="outlined"
                            margin="dense"
                            label="Interest"
                            id="name"
                            onChange={(e) =>
                                this.setState({ newInterest: e.target.value })
                            }
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() =>
                                this.setState({ modalOpenState: false })
                            }
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleAddInterest}
                            color="primary"
                        >
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(InterestsChips);
