import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "./../Input";
import { Tab, Tabs, TableRow, TableCell, 
    TableBody, Table, Paper, TextareaAutosize } from "@material-ui/core";
import Post from "./../Post";
import "./styles.css";
import { updatePostForm } from "./../action/posts"
import { withRouter } from "react-router-dom";
import api from "./../../../api"

class PostsDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);

        this.state = {
            postManager: {
                email: "",
                firstName: "",
                lastName: "",
                postings: []  // only used for startMakingPosts
            },

            title: "",  //key
            term: "",
            areaOfStudy: "",
            deadline: "",
            positions: "",
            description: "",

            message: {
                body: "",
                type: ""
            },
            researcher_id: 0,
            currentPostings: [],
            selectedTab: 0
        };
        this.displayContent.bind(this);
    }

    componentDidMount() {
        const sessionId = localStorage.getItem("sessionId")
            ? localStorage.getItem("sessionId")
            : sessionStorage.getItem("sessionId");
        api.getSession(sessionId).then((response) => {
            if (response.data.success) {
                api.getProfileByEmail(response.data.user.emailAddress).then(
                    (res) => {
                        if (res.data.success) {
                            this.setState({
                                postManager: {  // retrieve email, firstName, lastName
                                    email: res.data.data.emailAddress,
                                    firstName: res.data.data.firstName,
                                    lastName: res.data.data.lastName
                                }
                            });
                            api.getResearcherByEmail(this.state.postManager.email).then((res) => {
                                if (res.data.success) {
                                    this.setState({ 
                                        ...this.state,
                                        currentPostings: res.data.data.postings,
                                        researcher_id: res.data.data._id,
                                    }) // retrieve id
                                }
                            }
                                , (error) => {
                                    api.startMakingPosts(this.state.postManager).then((res) => {
                                        if (res.data.success) {
                                            this.setState({ researcher_id: res.data.data._id }) // create id
                                        }
                                    })
                                }
                            )
                        }
                    });
            } else {
                return this.props.history.push("/signOut");
            }
        });
    }

    addPost() {
        api.createPostForResearcher(this.state).then((res) => {
            if (res.data.success) {
                this.setState({
                    message: {
                        body: "Success: new post created",
                        type: "success"
                    }
                })
            }
        }, (error) => {
            this.setState({
                message: {
                    body: "Error: can not create post. Correctly provide all information to resolve error",
                    type: "error"
                }
            })
        })
    }

    displayContent() {
        const {title, term, areaOfStudy, deadline, positions, description} = this.state;
        if (this.state.selectedTab === 0) {
            return <Grid style={{marginTop: 40}}>
                <Grid className="post-form__button-grid" 
                      style={{marginLeft: 610, marginTop: 20, marginBottom: 30}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.addPost}
                        className="post-form__submit-button app_horizontal-center">
                        submit
                    </Button>
                </Grid>
                <Grid justify="center" container direcion="row">
                    <Grid item xs={3}>
                        <Input name="title" value={title} 
                        onChange={e => updatePostForm(this, e.target)}
                        label="Post Title" />
                    </Grid>
                    <Grid item xs={3}>
                        <Input name="areaOfStudy" value={areaOfStudy} 
                        onChange={e => updatePostForm(this, e.target)}
                        label="Area Of Study" />
                    </Grid>
                    <Grid item xs={3}>
                        <Input name="positions" value={description} 
                        onChange={e => updatePostForm(this, e.target)}
                        label="Number Of Positions" />
                    </Grid>
                </Grid>
                <Grid justify="center" container direcion="row">
                    <Grid item xs={3}>
                        <Input name="term" value={term} 
                        onChange={e => updatePostForm(this, e.target)}
                        label="Term" />
                    </Grid>
                    <Grid item xs={3}>
                        <Input name="deadline" value={deadline} 
                        onChange={e => updatePostForm(this, e.target)}
                        label="deadline (YYYY/MM/DD)" />
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
                <TextareaAutosize
                    rowsMax={100}
                    rowsMin={10}
                    style={{width: 650, fontSize: 18, marginLeft: 400, marginTop: 40}}
                    placeholder="Description of this research..."
                    onChange={(e) => updatePostForm(this, {
                        value: e.target.value, name: "description"})}/>

                </Grid>
        } else {
            return <Grid>
            <Table className="post-list" id="table">
            <TableBody>
                <TableRow className="post" id="header">
                    <TableCell component="th" scope="row">Area of Study</TableCell>
                    <TableCell component="th" scope="row">Term</TableCell>
                    <TableCell component="th" scope="row">Title</TableCell>
                    <TableCell component="th" scope="row">Positions</TableCell>
                    <TableCell component="th" scope="row">Deadline</TableCell>
                    <TableCell component="th" scope="row">Description</TableCell>
                    <TableCell component="th" scope="row"></TableCell>
                    <TableCell component="th" scope="row"></TableCell>
                </TableRow>
                {this.state.currentPostings.map(post => {
                    const i = this.state.currentPostings.indexOf(post);
                    return <Post post={post}
                        dashboard={this}
                        index={i}
                        history={this.props.history}
                        key={'key' + i} /> //key
                })}
            </TableBody>
            </Table>
            </Grid>
        }
    }

    render() {
        return (
            <Grid>
                <Grid style={{ marginTop: 30 }} container justify="center">
                    <Grid item>
                        <Paper style={{ flexGrow: 1 }}>
                            <Tabs value={this.state.selectedTab} indicatorColor="primary" textColor="primary"
                                onChange={(e, value) => this.setState({ selectedTab: value })}>
                                <Tab label="Create Post" />
                                <Tab label="Current Postings" />
                            }
                        </Tabs>
                        </Paper>
                    </Grid>
                </Grid>
                {this.displayContent()}
                <p style={{marginLeft: 100, marginTop: 40}} className={`post-form__message--${this.state.message.type}`}>
                    {this.state.message.body}
                </p>    
                <div style={{ height: 300 }}></div>
            </Grid>
        )
    }
}

export default withRouter(PostsDashboard);
