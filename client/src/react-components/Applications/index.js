import React from "react";
import {} from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";

import "./styles.css";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import apis from "../../api";

class Applications extends React.Component {
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
                            data.push({
                                id: application._id,
                                researchTitle: application.researchTitle,
                                researchId: application.researchId,
                                status: application.status
                            });
                        });
                        this.setState({ applicationList: data });
                    }
                }
            );
        });
    }

    handleOnClick(id) {
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
                                </div>
                                {application.status === "offered" && (
                                    <Button
                                        id="accept-btn"
                                        className="login__button"
                                        onClick={() => {
                                            this.handleOnClick(application.id);
                                        }}
                                    >
                                        ACCEPT OFFER
                                    </Button>
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

export default withRouter(Applications);
