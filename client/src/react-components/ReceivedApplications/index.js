import React from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import "./styles.css";
import apis from "../../api";

class ReceivedApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogState: false,
            application: {},
            applicationList: []
        };
    }

    componentDidMount() {
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        apis.getSession(sessionId).then((res) => {
            if (!res.data.success) {
                return this.props.history.push("/signOut");
            }
            apis.getResearcherByEmail(res.data.user.emailAddress).then(
                (response) => {
                    if (response.data.success) {
                        const postings = response.data.data.postings;
                        postings.forEach((posting) => {
                            apis.getApplicationsByResearchId(posting._id).then(
                                (r) => {
                                    if (r.data.success) {
                                        this.setState({
                                            applicationList: [
                                                ...this.state.applicationList,
                                                ...r.data.data
                                            ]
                                        });
                                    }
                                }
                            );
                        });
                    }
                }
            );
        });
    }

    handleOfferOffer(id) {
        apis.offerApplication(id).then((res) => {
            if (res.data.success) {
                const data = this.state.applicationList;
                data.forEach((application) => {
                    if (application._id === id) {
                        application.status = "offered";
                    }
                });
                this.setState({ applicationList: data });
            }
        });
    }

    handleRejectOffer(id) {
        apis.rejectApplication(id).then((res) => {
            if (res.data.success) {
                const data = this.state.applicationList;
                data.forEach((application) => {
                    if (application._id === id) {
                        application.status = "rejected";
                    }
                });
                this.setState({ applicationList: data });
            }
        });
    }

    // move application state to review once a document is downloaded
    handleReviewOffer(id) {
        let application;
        const data = this.state.applicationList;
        data.forEach((app) => {
            if (app._id === id) {
                application = app;
            }
        });
        if (application && application.status === "submitted") {
            apis.reviewApplication(id).then((res) => {
                if (res.data.success) {
                    const data = this.state.applicationList;
                    data.forEach((application) => {
                        if (application._id === id) {
                            application.status = "under review";
                        }
                    });
                    this.setState({ applicationList: data });
                }
            });
        }
    }

    bufferToUrl(buffer) {
        let resumeBytes = new Uint8Array(buffer.data.data);
        let resumeBlob = new Blob([resumeBytes], {
            type: "application/pdf"
        });
        let resumeDownloadUrl = URL.createObjectURL(resumeBlob);
        return resumeDownloadUrl;
    }

    renderDialog() {
        return (
            <Dialog
                open={this.state.dialogState}
                onClose={() => {
                    this.setState({ dialogState: false, application: {} });
                }}
                aria-labelledby="customized-dialog-title"
                maxWidth="xl"
            >
                <DialogTitle
                    onClose={() => {
                        this.setState({ dialogState: false, application: {} });
                    }}
                >
                    {"Application Details"}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        State: {this.state.application.status}
                    </Typography>
                    <Typography>
                        Submitted Documents:{" "}
                        <a
                            style={{ color: "#01579b" }}
                            href={this.bufferToUrl(
                                this.state.application.resume
                            )}
                            download="Resume"
                            onClick={() => {
                                this.handleReviewOffer(
                                    this.state.application._id
                                );
                            }}
                        >
                            RESUME
                        </a>{" "}
                        <a
                            style={{ color: "#01579b" }}
                            href={this.bufferToUrl(
                                this.state.application.transcript
                            )}
                            download="Transcript"
                            onClick={() => {
                                this.handleReviewOffer(
                                    this.state.application._id
                                );
                            }}
                        >
                            TRANSCRIPT
                        </a>
                    </Typography>
                </DialogContent>
                <DialogContent id="dialog-content">
                    <div>
                        <DialogContentText className="questions">
                            Applicant Name
                        </DialogContentText>
                        <DialogContentText>
                            {this.state.application.applicantName}
                        </DialogContentText>
                        <DialogContentText className="questions">
                            Applicant Email Address
                        </DialogContentText>
                        <DialogContentText>
                            {this.state.application.emailAddress}
                        </DialogContentText>
                        <DialogContentText className="questions">
                            Applicant Phone Number
                        </DialogContentText>
                        <DialogContentText>
                            {this.state.application.phoneNumber}
                        </DialogContentText>
                        <DialogContentText className="questions">
                            Applicant Area Of Study
                        </DialogContentText>
                        <DialogContentText>
                            {this.state.application.areaOfStudy}
                        </DialogContentText>
                    </div>
                    <div id="placeholder"></div>
                    <div>
                        <DialogContentText className="questions">
                            1. What interests you about this research?
                        </DialogContentText>
                        <DialogContentText>
                            {this.state.application.answers.questionOne}
                        </DialogContentText>
                        <DialogContentText className="questions">
                            2. What skills can you bring to the laboratory?
                        </DialogContentText>
                        <DialogContentText>
                            {this.state.application.answers.questionTwo}
                        </DialogContentText>
                        <DialogContentText className="questions">
                            3. Do you have any previous research experience? If
                            yes, please briefly describe the project, including
                            your role in the project.
                        </DialogContentText>
                        <DialogContentText>
                            {this.state.application.answers.questionThree}
                        </DialogContentText>
                        <DialogContentText className="questions">
                            4. How many hours in a week can you commit to being
                            in the lab?
                        </DialogContentText>
                        <DialogContentText>
                            {this.state.application.answers.questionFour}
                        </DialogContentText>
                    </div>
                </DialogContent>
                <DialogActions>
                    {this.state.application.status === "under review" && (
                        <div>
                            <Button
                                onClick={() => {
                                    this.handleOfferOffer(
                                        this.state.application._id
                                    );
                                }}
                                color="primary"
                                autoFocus
                            >
                                SEND OFFER
                            </Button>
                            <Button
                                onClick={() => {
                                    this.handleRejectOffer(
                                        this.state.application._id
                                    );
                                }}
                                color="primary"
                                autoFocus
                            >
                                REJECT APPLICATION
                            </Button>
                        </div>
                    )}
                    <Button
                        onClick={() => {
                            this.setState({
                                dialogState: false,
                                application: {}
                            });
                        }}
                        color="primary"
                        autoFocus
                    >
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        return (
            <List id="research-container">
                {this.state.dialogState && this.renderDialog()}
                {this.state.applicationList.map((application) => {
                    return (
                        <div>
                            <Grid id="research-item" item xs>
                                <div>
                                    <ButtonBase>
                                        <Typography gutterBottom variant="h6">
                                            <Link
                                                style={{ color: "#01579b" }}
                                                href=""
                                                onClick={() => {
                                                    this.setState({
                                                        dialogState: true,
                                                        application: application
                                                    });
                                                }}
                                            >
                                                {application.researchTitle}
                                            </Link>
                                        </Typography>
                                    </ButtonBase>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom
                                    >
                                        Status: {application.status}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Applicant Name:
                                        {application.applicantName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Applicant Area of Study:
                                        {application.areaOfStudy}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Research Id: {application.researchId}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Submitted Documents:{" "}
                                        <a
                                            style={{ color: "#01579b" }}
                                            href={this.bufferToUrl(
                                                application.resume
                                            )}
                                            download="Resume"
                                            onClick={() => {
                                                this.handleReviewOffer(
                                                    application._id
                                                );
                                            }}
                                        >
                                            RESUME
                                        </a>{" "}
                                        <a
                                            style={{ color: "#01579b" }}
                                            href={this.bufferToUrl(
                                                application.transcript
                                            )}
                                            download="Transcript"
                                            onClick={() => {
                                                this.handleReviewOffer(
                                                    application._id
                                                );
                                            }}
                                        >
                                            TRANSCRIPT
                                        </a>
                                    </Typography>
                                </div>
                                {application.status === "under review" && (
                                    <div id="action-btn">
                                        <Button
                                            className="login__button"
                                            onClick={() => {
                                                this.handleOfferOffer(
                                                    application._id
                                                );
                                            }}
                                        >
                                            SEND OFFER
                                        </Button>
                                        <Button
                                            className="login__button"
                                            onClick={() => {
                                                this.handleRejectOffer(
                                                    application._id
                                                );
                                            }}
                                        >
                                            REJECT APPLICATION
                                        </Button>
                                    </div>
                                )}
                            </Grid>
                            <Divider />
                        </div>
                    );
                })}
            </List>
        );
    }
}

export default withRouter(ReceivedApplications);
