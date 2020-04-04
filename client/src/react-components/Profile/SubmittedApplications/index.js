import React from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import "./styles.css";
import apis from "../../../api";

class SubmittedApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            apis.getApplicationsByEmail(res.data.user.emailAddress).then(
                (response) => {
                    if (response.data.success) {
                        let data = [];
                        response.data.data.forEach((application) => {
                            data.push(application);
                        });
                        this.setState({ applicationList: data });
                    }
                }
            );
        });
    }

    handleAcceptOffer(id) {
        apis.acceptApplication(id).then((res) => {
            if (res.data.success) {
                const data = this.state.applicationList;
                data.forEach((application) => {
                    if (application._id === id) {
                        application.status = "accepted";
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

    bufferToUrl(buffer) {
        let resumeBytes = new Uint8Array(buffer.data.data);
        let resumeBlob = new Blob([resumeBytes], {
            type: "application/pdf"
        });
        let resumeDownloadUrl = URL.createObjectURL(resumeBlob);
        return resumeDownloadUrl;
    }

    render() {
        return (
            <List id="research-container">
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
                                            >
                                                {application.researchTitle}
                                            </Link>
                                        </Typography>
                                    </ButtonBase>
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
                                        Status: {application.status}
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
                                        >
                                            RESUME
                                        </a>{" "}
                                        <a
                                            style={{ color: "#01579b" }}
                                            href={this.bufferToUrl(
                                                application.transcript
                                            )}
                                            download="Transcript"
                                        >
                                            TRANSCRIPT
                                        </a>
                                    </Typography>
                                </div>
                                {application.status === "offered" && (
                                    <div id="action-btn">
                                        <Button
                                            className="login__button"
                                            onClick={() => {
                                                this.handleAcceptOffer(
                                                    application._id
                                                );
                                            }}
                                        >
                                            ACCEPT OFFER
                                        </Button>
                                        <Button
                                            className="login__button"
                                            onClick={() => {
                                                this.handleRejectOffer(
                                                    application._id
                                                );
                                            }}
                                        >
                                            REJECT OFFER
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

export default withRouter(SubmittedApplications);
