import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "./../Input";
import { Tab, Tabs, TableRow, TableCell,
    TableBody, Table, Paper, TextareaAutosize } from "@material-ui/core";
import Post from "./../Post/CurrentPost";
import RemovedPost from "./../Post/RemovedPost";
import "./styles.css";
import { updatePostForm } from "./../action/posts"
import { withRouter } from "react-router-dom";
import api from "./../../../api"

class PostsDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.addPost = this.addPost.bind(this);
        this.updatePostings = this.updatePostings.bind(this);
        this.updateRemovedPostings = this.updateRemovedPostings.bind(this);

        this.state = {
            postManager: {
                email: "",
                firstName: "",
                lastName: "",
            },

            title: "",  //key
            term: "",
            areaOfStudy: "",
            deadline: "",
            positions: "",
            description: "N/A",

            researcher_id: 0,
            currentPostings: [],
            removedPostings: [],
            selectedTab: 0,
            post_updated: false,
            removed_updated: false
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
                            if (this.state.researcher_id === 0) {
                              api.getResearcherByEmail(this.state.postManager.email).then((res) => {
                                if (res.data.success && this.state.researcher_id === 0) {
                                    this.setState({researcher_id: res.data.data._id}) // retrieve id
                                }}
                                , (error) => {
                                    api.startMakingPosts(this.state.postManager).then((res) => {
                                        if (res.data.success) {
                                            this.setState({ researcher_id: res.data.data._id }) // create id
                                        }
                                    })
                                }
                            )}
                        }});
            } else {
                return this.props.history.push("/signOut");
            }
        });
    }

      updateRemovedPostings() {
      if (!this.state.removed_updated) {
        api.getResearcherByEmail(this.state.postManager.email).then((res) => {
            this.setState({
              removedPostings: res.data.data.removedPostings
            })
        });
        this.setState({
          removed_updated: true
        })}
      }

      updatePostings() {
        if (!this.state.post_updated){
          api.getResearcherByEmail(this.state.postManager.email).then((res) => {
            this.setState({
              currentPostings: res.data.data.postings
            })
        });
        this.setState({
          post_updated: true
        })}
      }

    addPost() {
        api.createPostForResearcher(this.state).then((res) => {
            if (res.data.success) {
                alert("Success: new post created successfully")
            }
        }, (error) => {
            alert("Error: Can not create post. Correctly provide all information to resolve error")
        })
    }

    displayContent() {
        const {title, term, areaOfStudy, deadline, positions, description} = this.state;
        if (this.state.selectedTab === 0) {
            return <Grid style={{marginTop: 40}}>
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
                        <Input name="positions" value={positions}
                        onChange={e => updatePostForm(this, e.target)}
                        label="Number Of Positions" />
                    </Grid>
                </Grid>
                <Grid justify="center" container direcion="row">
                    <Grid item xs={3}>
                        <Input name="term" value={term}
                        onChange={e => updatePostForm(this, e.target)}
                        label="Term (e.g. 2021 Summer)" />
                    </Grid>
                    <Grid item xs={3}>
                        <Input name="deadline" value={deadline}
                        onChange={e => updatePostForm(this, e.target)}
                        label="Deadline (YYYY/MM/DD)" />
                    </Grid>
                    <Grid item xs={3}></Grid>
                </Grid>
                <TextareaAutosize
                    rowsMax={100}
                    rowsMin={10}
                    style={{width: 650, fontSize: 18, marginLeft: 300, marginTop: 30}}
                    placeholder="Description of this research..."
                    onChange={(e) => updatePostForm(this, {
                        value: e.target.value, name: "description"})}/>

                        <Grid className="post-form__button-grid"
                              style={{marginLeft: 500}}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.addPost}
                                className="post-form__submit-button app_horizontal-center">
                                submit
                            </Button>
                        </Grid>
                </Grid>
        } else if (this.state.selectedTab === 1) {
            this.updatePostings();
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
                        index={i}
                        dashboard={this}
                        history={this.props.history}
                        key={'key' + i} /> //key
                })}
            </TableBody>
            </Table>
            </Grid>
        } else {
            this.updateRemovedPostings();
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
                {this.state.removedPostings.map(post => {
                    const i = this.state.removedPostings.indexOf(post);
                    return <RemovedPost post={post}
                        index={i}
                        dashboard={this}
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
                                <Tab label="Removed Postings" />
                            }
                        </Tabs>
                        </Paper>
                    </Grid>
                </Grid>
                {this.displayContent()}
                <div style={{ height: 170 }}></div>
            </Grid>
        )
    }
}

export default withRouter(PostsDashboard);
