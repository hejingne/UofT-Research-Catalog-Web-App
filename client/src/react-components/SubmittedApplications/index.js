import React from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import "./styles.css";
import apis from "../../api";

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
                            let resumeBytes = new Uint8Array(
                                application.resume.data.data
                            );
                            let resumeBlob = new Blob([resumeBytes], {
                                type: "application/pdf"
                            });
                            let resumeDownloadUrl = URL.createObjectURL(
                                resumeBlob
                            );

                            let transcriptBytes = new Uint8Array(
                                application.transcript.data.data
                            );
                            let transcriptBlob = new Blob([transcriptBytes], {
                                type: "application/pdf"
                            });
                            let transcriptDownloadUrl = URL.createObjectURL(
                                transcriptBlob
                            );

                            data.push({
                                id: application._id,
                                researchTitle: application.researchTitle,
                                researchId: application.researchId,
                                status: application.status,
                                resume: resumeDownloadUrl,
                                transcript: transcriptDownloadUrl
                            });
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
                    if (application.id === id) {
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
                    if (application.id === id) {
                        application.status = "rejected";
                    }
                });
                this.setState({ applicationList: data });
            }
        });
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
                                    {/*<Typography variant="subtitle1" gutterBottom>*/}
                                    {/*    Introduction*/}
                                    {/*</Typography>*/}
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
                                            href={application.resume}
                                            download="Resume"
                                        >
                                            RESUME
                                        </a>{" "}
                                        <a
                                            style={{ color: "#01579b" }}
                                            href={application.transcript}
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
                                                    application.id
                                                );
                                            }}
                                        >
                                            ACCEPT OFFER
                                        </Button>
                                        <Button
                                            className="login__button"
                                            onClick={() => {
                                                this.handleRejectOffer(
                                                    application.id
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
