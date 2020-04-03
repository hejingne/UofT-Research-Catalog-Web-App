import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dashboard from "../../Dashboard";
import InterestsChips from "../../InterestsChips";
import SubmittedApplications from "../../SubmittedApplications";
import ReceivedApplications from "../../ReceivedApplications";
import Divider from "@material-ui/core/Divider";
import { Grid, Typography, Paper, Tabs, Tab, Link, ButtonBase } from '@material-ui/core';
import apis from "../../../api";

import "./styles.css";

class ViewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: "",
            personalInfo: {
                firstName: "",
                lastName: "",
                description: "",
                profilePicture: null,
                interests: []
            },
            selectedTab: 0
        };
        this.displayContent.bind(this);
        this.fetchResearches.bind(this);
        this.fetchApplications.bind(this);
        this.listGenerator.bind(this);
        this.researchInfo.bind(this);
    }


    fetchResearches() {
        apis.getAllResearches().then(
            (res) => {
                if (res.data.success) {
                    const result = res.data.data.find((posting) => 
                    posting.firstName.localeCompare(this.state.personalInfo.firstName) === 0 &&
                    posting.lastName.localeCompare(this.state.personalInfo.lastName) === 0
                    );
                    
                    this.setState({
                        list: result.postings
                    });
                }
            }
        );
    }

    fetchApplications() {

    }

    componentDidMount() {
        // connect to db to fetch and use this.setState() to update info
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        apis.getSession(sessionId).then((response) => {
            if (response.data.success) {
                apis.getProfileByEmail(this.props.location.state.email).then(
                    (res) => {
                        if (res.data.success) {
                            let imagePath = require("./static/no-profile-picture-icon.png");
                            if (res.data.data.profilePicture) {
                                const image = btoa(
                                    String.fromCharCode.apply(
                                        null,
                                        res.data.data.profilePicture.data.data
                                    )
                                );
                                imagePath = "data:image/png;base64," + image;
                            }

                            this.setState({
                                personalInfo: {
                                    firstName: res.data.data.firstName,
                                    lastName: res.data.data.lastName,
                                    description: res.data.data.description,
                                    profilePicture: imagePath,
                                    interests: res.data.data.interests,
                                    email: res.data.data.emailAddress
                                }
                            });
                            this.setState({ userType: res.data.data.userType });
                            if (this.state.userType.localeCompare("Researcher") === 0) {
                                this.fetchResearches();
                            } if (this.state.userType.localeCompare("Student") === 0) {
                            }
                        }
                    }
                );
            } else {
                return this.props.history.push("/signOut");
            }
        });
    }

    researchInfo(research) {
        return (
            <Grid item xs={9}>
                <ButtonBase>
                    <Typography gutterBottom variant="h6">
                        <Link style={{ color: '#01579b' }}
                            onClick={() => this.setState({ openDialog: true })}>
                            {research.title}
                        </Link>
                    </Typography>
                </ButtonBase>
                <Typography variant="subtitle1" gutterBottom>
                    Introduction: {" "}{
                        research.description === undefined ? "" :
                            research.description.length <= 100 ? 
                                research.description :
                                research.description
                                .substring(0, 100)
                                .concat("...")
                    }
                </Typography>

                <Typography variant="body2" color="textSecondary">
                    Deadline: {research.deadline}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Duration: {research.term}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Positions: {research.positions}
                </Typography>
                {this.props.userType === "Student" &&
                <Grid style={{marginTop: 5}} item>
                    <Button 
                    onClick={(e) => {
                        this.setState({ 
                            ...this.state, 
                            toApplication: true,
                            chosenTitle: research.title,
                            chosenId: research.id
                        });
                    }}
                    className="search__button">Apply</Button>
                </Grid>
                }
                </Grid>
        )
    }

    listGenerator(list) {
        return list.map((research) => {
            return (<Paper style={{ height: 200, width: 1000 }} variant="outlined" square>
                <Grid container 
                spacing={2} 
                justify="center" 
                style={{ marginTop: 25,marginLeft: 25 }} 
                direction="row" 
                alignItems="center">
                    {this.researchInfo(research)}
                </Grid>
                </Paper>
            );
        })
    }

    displayContent() {
        if (this.state.userType.localeCompare("Researcher") === 0) {
            if (this.state.selectedTab === 0) {
                return <Grid item>
                    <Typography style={{color: "#424242"}}>
                        {this.state.personalInfo.description.length > 0 ? 
                        this.state.personalInfo.description :
                        "No description yet..."
                        }
                    </Typography>
                </Grid>
            } else {
                return this.listGenerator(this.state.list);
            }
        } else if (this.state.userType.localeCompare("Student") === 0) {
            if (this.state.selectedTab === 0) {

            } else {

            }
        }
    }

    render() {
        return (
            <Grid>
                <Grid container direction="row" justify="center" spacing={3}>
                    <Grid item style={{margin: 30}}>
                        <Typography style={{fontSize: 30, fontWeight: "bold", color: "#424242"}}>
                        {this.state.personalInfo.firstName +
                                " " +
                        this.state.personalInfo.lastName}
                        </Typography>
                        <Typography color="textSecondary">
                            Email: {this.state.personalInfo.email}
                        </Typography>
                        <Typography color="textSecondary">
                            User Type: {this.state.userType}
                        </Typography>
                        {this.state.personalInfo.interests.length > 0 && 
                            <Typography color="textSecondary">
                            Interested Areas: {
                            this.state.personalInfo.interests.join(", ")
                        }</Typography>}
                    </Grid>
                    <Grid item style={{margin: 30}} >
                        <img
                        id="profile-pic"
                        src={this.state.personalInfo.profilePicture}/>
                    </Grid>
                </Grid>
                <Divider></Divider>
                <Grid style={{ marginTop: 40 }} container justify="center">
                    <Grid item>
                        <Paper style={{flexGrow: 1}}>
                            <Tabs value={this.state.selectedTab} indicatorColor="primary"       textColor="primary" 
                            onChange={(e, value) => this.setState({selectedTab: value})}>
                                <Tab label="About Me" />
                                {this.state.userType.localeCompare("Student") === 0 &&
                                <Tab label="Submitted Applications" />
                                }
                                {this.state.userType.localeCompare("Researcher") === 0 &&
                                <Tab label="Posted Opportunities" />
                                }
                            </Tabs>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid style={{marginTop: 30}} container justify="center">
                    {this.displayContent()}
                </Grid>
                <div style={{height: 300}}></div>
            </Grid>
        );
    }
}

export default withRouter(ViewProfile);
