import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";
import Chip from "@material-ui/core/Chip";

import "./styles.css";
import {Add} from "@material-ui/icons";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";


class InterestsChips extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddInterest = this.handleAddInterest.bind(this);
        this.state = {
            interests: ["interest 1", "interest 2", "interest 3"],
            newInterest: "",
            modalOpenState: false
        }
        ;
    }

    componentDidMount() {
        // connect to db to fetch and use this.setState() to update interests
    }


    handleDeleteInterest(e) {
        const interest = e.target.parentElement.parentElement.innerText;
        const updatedInterests = this.state.interests.filter((element) => element !== interest);
        this.setState({interests: updatedInterests});
        // connect to db to update interests
    }

    handleAddInterest() {
        this.setState({modalOpenState: false});
        const interest = this.state.newInterest;
        const existInterests = this.state.interests;
        if (interest && existInterests.filter((element) => element === interest).length === 0) {
            existInterests.push(interest);
            this.setState({interests: existInterests});
            this.setState({newInterest: ""});
        }
        // connect to db to update interests
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
                    icon={<Add/>}
                    onClick={() => this.setState({modalOpenState: true})}
                />
                <Dialog open={this.state.modalOpenState} onClose={() => this.setState({modalOpenState: false})}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Please Enter Your Interest: </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            variant="outlined"
                            margin="dense"
                            label="Interest"
                            id="name"
                            onChange={(e) => this.setState({newInterest: e.target.value})}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({modalOpenState: false})} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleAddInterest} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(InterestsChips);