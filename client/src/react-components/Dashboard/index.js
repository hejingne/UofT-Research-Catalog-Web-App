import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";

import "./styles.css";
import apis from "../../api";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpdateCard = this.handleUpdateCard.bind(this);
        this.state = {
            modalOpenState: false,
            selectedCard: "",
            selectedCardText: "",
            dashboardInfo: {
                "User Type": "",
                "Number of Applications Submitted": "",
                "Number of Opportunities Posted": "",
                "Current Employment State": "",
                "Current Employer": "",
                "Current Position": ""
            }
        };
    }

    componentDidMount() {
        // connect to db to fetch and use this.setState() to update dashboardInfo
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        apis.getSession(sessionId).then((response) => {
            if (!response.data.success) {
                return this.props.history.push("/signOut");
            }
            let numOfApplicationSubmitted = 0;
            let numOfResearchPosted = 0;
            apis.getApplicationsByEmail(response.data.user.emailAddress).then(
                (res) => {
                    if (res.data.success) {
                        numOfApplicationSubmitted = res.data.data.length;
                    }
                }
            );

            apis.getResearcherByEmail(response.data.user.emailAddress).then(
                (res) => {
                    if (res.data.success) {
                        numOfResearchPosted = res.data.data.postings.length;
                    }
                }
            );
            apis.getProfileByEmail(response.data.user.emailAddress).then(
                (res) => {
                    if (res.data.success) {
                        const currentEmploymentState =
                            !res.data.data.currentEmployer ||
                            res.data.data.currentEmployer === "N/A"
                                ? "Unemployed"
                                : "Employed";

                        this.setState({
                            dashboardInfo: {
                                "User Type": res.data.data.userType,
                                "Number of Applications Submitted": numOfApplicationSubmitted,
                                "Number of Opportunities Posted": numOfResearchPosted,
                                "Current Employment State": currentEmploymentState,
                                "Current Employer":
                                res.data.data.currentEmployer,
                                "Current Position":
                                res.data.data.currentPosition
                            }
                        });
                    }
                }
            );
        });
    }

    handleOnClickEdit(e) {
        const selectedCard =
            e.target.parentElement.parentElement.parentElement.firstChild
                .firstChild.innerText;
        const selectedCardText =
            e.target.parentElement.parentElement.parentElement.firstChild
                .firstChild.nextSibling.innerText;
        this.setState({
            selectedCard: selectedCard,
            selectedCardText: selectedCardText,
            modalOpenState: true
        });
    }

    handleUpdateCard() {
        const selectedCard = this.state.selectedCard;
        const selectedCardText = this.state.selectedCardText
            ? this.state.selectedCardText
            : "N/A";
        const dashboardInfo = this.state.dashboardInfo;
        dashboardInfo[selectedCard] = selectedCardText;
        this.setState({ modalOpenState: false, dashboardInfo: dashboardInfo });
        // update server and database
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        apis.getSession(sessionId).then((response) => {
            if (!response.data.success) {
                return this.props.history.push("/signOut");
            }
            apis.updateEmploymentInfo({
                emailAddress: response.data.user.emailAddress,
                currentEmployer: this.state.dashboardInfo["Current Employer"],
                currentPosition: this.state.dashboardInfo["Current Position"]
            });
        });
    }

    render() {
        return (
            <div id="grid-container">
                {Object.entries(this.state.dashboardInfo).map((element) => {
                    return (
                        <Grid id="item" item xs>
                            <Card>
                                <CardContent>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        {element[0]}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {element[1]}
                                    </Typography>
                                </CardContent>
                                {(element[0] === "Current Employer" ||
                                    element[0] === "Current Position") && (
                                    <CardActions>
                                        <Button
                                            size="small"
                                            onClick={(e) =>
                                                this.handleOnClickEdit(e)
                                            }
                                        >
                                            Edit
                                        </Button>
                                    </CardActions>
                                )}
                            </Card>
                        </Grid>
                    );
                })}
                <Dialog
                    open={this.state.modalOpenState}
                    onClose={() => this.setState({ modalOpenState: false })}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Please Enter Your New {this.state.selectedCard}:{" "}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            value={this.state.selectedCardText}
                            variant="outlined"
                            margin="dense"
                            // label="Interest"
                            id="name"
                            onChange={(e) =>
                                this.setState({
                                    selectedCardText: e.target.value
                                })
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
                        <Button onClick={this.handleUpdateCard} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withRouter(Dashboard);
