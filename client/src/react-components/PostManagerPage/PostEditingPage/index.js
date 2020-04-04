import React from "react";
import Button from "@material-ui/core/Button";
import Input from "./../Input";
import { Grid, TableRow, TableCell, Divider,
    TableBody, Table, Typography, TextareaAutosize } from "@material-ui/core";
import "./styles.css";
import { updatePostForm, editPost } from "./../action/posts";
import { withRouter } from "react-router-dom";
import api from "./../../../api";

class PostEditingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            term: "",
            areaOfStudy: "",
            deadline: "",
            positions: "",
            description: "",

            researcher_id: 0,
            index: 0
        }
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
                            const email = res.data.data.emailAddress;
                            api.getResearcherByEmail(email).then((res) => {
                                if (res.data.success) {
                                    const posting = res.data.data.postings[this.state.index]
                                    this.setState({
                                        title: posting.title,
                                        term: posting.term,
                                        areaOfStudy: posting.areaOfStudy,
                                        deadline: posting.deadline,
                                        positions: posting.positions,
                                        description: posting.description,
                                        researcher_id: res.data.data._id,
                                        index: this.props.index
                                    })
                                }
                            }
                            )
                        }
                    });
            } else {
                return this.props.history.push("/signOut");
            }
        });
    }

    render() {
        const { title, term, areaOfStudy, deadline, positions, description } = this.state;

        return (
            <React.Fragment key="inputs">
                <Grid style={{marginLeft: 100, marginTop: 70}}>
                <Typography variant="h6" style={{color: "#424242", fontWeight: "bold"}}> 
                    This posting will be saved as: 
                </Typography>
                </Grid>
                <Table className="post-list" id="table">
                    <TableBody>
                        <TableRow className="post" id="header">
                            <TableCell component="th" scope="row">Area of Study</TableCell>
                            <TableCell component="th" scope="row">Term</TableCell>
                            <TableCell component="th" scope="row">Title</TableCell>
                            <TableCell component="th" scope="row">Positions</TableCell>
                            <TableCell component="th" scope="row">Deadline</TableCell>
                            <TableCell component="th" scope="row">Description</TableCell>
                        </TableRow>
                        <TableRow className="post">
                            <TableCell component="th" scope="row" >{areaOfStudy}</TableCell>
                            <TableCell component="th" scope="row" >{term}</TableCell>
                            <TableCell component="th" scope="row" >{title}</TableCell>
                            <TableCell component="th" scope="row" >{positions}</TableCell>
                            <TableCell component="th" scope="row" >{deadline}</TableCell>
                            <TableCell component="th" scope="row" >{description}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div style={{height: 60}}></div>
                <Divider></Divider>

                <Grid style={{marginLeft: 100, marginTop: 40}}>
                <Typography variant="h6" style={{color: "#424242", fontWeight: "bold"}}> 
                    Provide information to update posting: 
                </Typography>
                </Grid>
                <Grid>
                <Grid className="post-form__button-grid" 
                      style={{marginLeft: 610, marginBottom: 30}}>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editPost(this)}
                    className="save-button app_horizontal-center">
                    Save Post
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
                        label="Term (e.g., 2021 Summer)" />
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
                    style={{width: 650, fontSize: 18, marginLeft: 400, marginTop: 50}}
                    placeholder="Description of this research..."
                    onChange={(e) => updatePostForm(this, {
                        value: e.target.value, name: "description"})}/>
                </Grid>
                <div style={{height: 170}}></div>
            </React.Fragment>
        )
    }
}

export default withRouter(PostEditingPage);
