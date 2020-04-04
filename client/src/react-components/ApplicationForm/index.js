import React from "react";
import { withRouter } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography, TextField, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import "./styles.css";
import apis from "../../api";

class ApplicationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alreadyApplied: false,
            uploadNewDocument: false,
            existingResume: {},
            existingTranscript: {},
            researchId: "",
            researchTitle: "",
            applicantName: "",
            emailAddress: "",
            phoneNumber: "",
            areaOfStudy: "",
            question1: "",
            question2: "",
            question3: "",
            question4: ""
        };
        this.cv = React.createRef();
        this.transcript = React.createRef();
    }

    componentDidMount() {
        this.setState({ 
            researchId: this.props.location.state.id, 
            researchTitle: this.props.location.state.title
        });
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        apis.getSession(sessionId).then((response) => {
            if (!response.data.success) {
                return this.props.history.push("/signOut");
            }

            apis.getApplicationsByEmail(response.data.user.emailAddress).then(
                (res) => {
                    if (res.data.success) {
                        const applications = res.data.data;
                        applications.forEach((application) => {
                            if (
                                application.researchId === this.state.researchId
                            ) {
                                this.setState({ alreadyApplied: true });
                            }
                        });
                        const mostRecentApplication =
                            applications[applications.length - 1];
                        if (mostRecentApplication) {
                            this.setState({
                                phoneNumber: mostRecentApplication.phoneNumber,
                                areaOfStudy: mostRecentApplication.areaOfStudy,
                                existingResume: mostRecentApplication.resume,
                                existingTranscript:
                                    mostRecentApplication.transcript
                            });
                        }
                    }
                }
            );

            apis.getProfileByEmail(response.data.user.emailAddress).then(
                (res) => {
                    if (res.data.success) {
                        this.setState({
                            applicantName:
                                res.data.data.firstName +
                                " " +
                                res.data.data.lastName,
                            emailAddress: res.data.data.emailAddress
                        });
                    }
                }
            );
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.alreadyApplied) {
            alert("You Have Already Applied This Research");
            return;
        }

        if (
            !(
                this.cv.current &&
                this.transcript.current &&
                this.cv.current.files[0] &&
                this.transcript.current.files[0]
            ) &&
            this.state.uploadNewDocument
        ) {
            alert("Requested fields are not completed or files are not there.");
            return;
        }

        if (
            Object.entries(this.state).filter((state) => state[1] === "")
                .length > 0
        ) {
            alert("Requested fields are not completed or files are not there.");
            return;
        }

        const data = new FormData();
        if (this.state.uploadNewDocument) {
            data.append("resume", this.cv.current.files[0]);
            data.append("transcript", this.transcript.current.files[0]);
        } else {
            data.append(
                "existingResume",
                JSON.stringify(this.state.existingResume)
            );
            data.append(
                "existingTranscript",
                JSON.stringify(this.state.existingTranscript)
            );
        }
        data.append("status", "submitted");
        data.append("researchId", this.state.researchId);
        data.append("researchTitle", this.state.researchTitle);
        data.append("questionOne", this.state.question1);
        data.append("questionTwo", this.state.question2);
        data.append("questionThree", this.state.question3);
        data.append("questionFour", this.state.question4);
        data.append("applicantName", this.state.applicantName);
        data.append("emailAddress", this.state.emailAddress);
        data.append("phoneNumber", this.state.phoneNumber);
        data.append("areaOfStudy", this.state.areaOfStudy);
        apis.createApplications(data).then((res) => {
            if (res.data.success) {
                alert("Successfully applied");
                this.props.history.push("/home");
            }
        });
    }

    render() {
        return (
            <div id="application-container">
                <Dialog
                    open={this.state.alreadyApplied}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"You Have Already Applied This Research"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You have already applied this research. You can not
                            submit multiple applications to one research.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                this.props.history.push("/home");
                            }}
                            color="primary"
                            autoFocus
                        >
                            BACK TO HOME PAGE
                        </Button>
                    </DialogActions>
                </Dialog>
                <div
                    style={{ flexGrow: 1 }}
                    spacing={5}
                    direction="column"
                    justify="center"
                >
                    <Paper
                        style={{
                            margin: "auto",
                            maxWidth: 1000,
                            backgroundColor: "#eeeeee"
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            justify="center"
                            sm
                            container
                            spacing={3}
                            style={{ padding: 40 }}
                        >
                            <Grid
                                item
                                xs={9}
                                container
                                direction="column"
                                spacing={3}
                            >
                                <Typography gutterBottom variant="h5">
                                    Personal Information:
                                </Typography>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    value={this.state.applicantName}
                                    onChange={(e) =>
                                        this.setState({
                                            applicantName: e.target.value
                                        })
                                    }
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.emailAddress}
                                    onChange={(e) =>
                                        this.setState({
                                            emailAddress: e.target.value
                                        })
                                    }
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone-number"
                                    label="Phone Number"
                                    name="phone-number"
                                    autoComplete="phone-number"
                                    value={this.state.phoneNumber}
                                    onChange={(e) =>
                                        this.setState({
                                            phoneNumber: e.target.value
                                        })
                                    }
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="major"
                                    label="Major"
                                    name="major"
                                    autoComplete="major"
                                    value={this.state.areaOfStudy}
                                    onChange={(e) =>
                                        this.setState({
                                            areaOfStudy: e.target.value
                                        })
                                    }
                                    autoFocus
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            justify="center"
                            sm
                            container
                            spacing={3}
                            style={{ padding: 40 }}
                        >
                            <Grid
                                item
                                xs={9}
                                container
                                direction="column"
                                spacing={3}
                            >
                                <Typography gutterBottom variant="h5">
                                    Please answer the following questions:
                                </Typography>
                                <Typography variant="h6">
                                    1. What interests you about this research?
                                </Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    multiline
                                    onChange={(e) =>
                                        this.setState({
                                            question1: e.target.value
                                        })
                                    }
                                    id="question-one"
                                />
                                <Typography variant="h6">
                                    2. What skills can you bring to the
                                    laboratory?
                                </Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    multiline
                                    onChange={(e) =>
                                        this.setState({
                                            question2: e.target.value
                                        })
                                    }
                                    id="question-two"
                                />
                                <Typography variant="h6">
                                    3. Do you have any previous research
                                    experience? If yes, please briefly describe
                                    the project, including your role in the
                                    project.
                                </Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    multiline
                                    onChange={(e) =>
                                        this.setState({
                                            question3: e.target.value
                                        })
                                    }
                                    id="question-three"
                                />
                                <Typography variant="h6">
                                    4. How many hours in a week can you commit
                                    to being in the lab?
                                </Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    multiline
                                    onChange={(e) =>
                                        this.setState({
                                            question4: e.target.value
                                        })
                                    }
                                    id="question-four"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            justify="center"
                            sm
                            container
                            spacing={3}
                            style={{ padding: 40 }}
                        >
                            <Grid
                                item
                                xs={9}
                                container
                                direction="column"
                                spacing={3}
                            >
                                <Typography gutterBottom variant="h5">
                                    Please attach the following documents (in
                                    pdf format):
                                </Typography>
                                <form>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="quiz"
                                            name="quiz"
                                        >
                                            {// if there is no existing documents, hide use existing documents option
                                            !(
                                                Object.keys(
                                                    this.state.existingResume
                                                ).length === 0 &&
                                                this.state.existingResume
                                                    .constructor === Object &&
                                                Object.keys(
                                                    this.state
                                                        .existingTranscript
                                                ).length === 0 &&
                                                this.state.existingTranscript
                                                    .constructor === Object
                                            ) && (
                                                <FormControlLabel
                                                    value="best"
                                                    control={
                                                        <Radio
                                                            color="default"
                                                            onChange={() => {
                                                                this.setState({
                                                                    uploadNewDocument: false
                                                                });
                                                            }}
                                                        />
                                                    }
                                                    label="Use existing CV and Transcript (from the most recent submitted application)"
                                                />
                                            )}
                                            <FormControlLabel
                                                value="worst"
                                                control={
                                                    <Radio
                                                        color="default"
                                                        onChange={() => {
                                                            this.setState({
                                                                uploadNewDocument: true
                                                            });
                                                        }}
                                                    />
                                                }
                                                label="Upload new CV and Transcript"
                                            />
                                            {this.state.uploadNewDocument && (
                                                <div>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h6"
                                                    >
                                                        1. CV{" "}
                                                        <input
                                                            type="file"
                                                            accept=".pdf"
                                                            ref={this.cv}
                                                        />
                                                    </Typography>
                                                    <Typography
                                                        gutterBottom
                                                        variant="h6"
                                                    >
                                                        2. Unofficial Transcript{" "}
                                                        <input
                                                            type="file"
                                                            accept=".pdf"
                                                            ref={
                                                                this.transcript
                                                            }
                                                        />
                                                    </Typography>
                                                </div>
                                            )}
                                        </RadioGroup>
                                    </FormControl>
                                </form>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            justify="center"
                            sm
                            container
                            spacing={3}
                            style={{ padding: 40 }}
                        >
                            <Button
                                className="login__button"
                                type="submit"
                                onClick={(e) => {
                                    this.handleSubmit(e);
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Paper>
                </div>
                <div style={{ height: 300 }} />
            </div>
        );
    }
}

export default withRouter(ApplicationForm);
