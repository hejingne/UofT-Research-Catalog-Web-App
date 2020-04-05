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
            description: "N/A",

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
                                    const newIndex = res.data.data.index;
                                    const posting = res.data.data.postings[newIndex]
                                    this.setState({
                                      title: posting.title,
                                      term: posting.term,
                                      areaOfStudy: posting.areaOfStudy,
                                      deadline: posting.deadline,
                                      positions: posting.positions,
                                      description: posting.description,
                                      researcher_id: res.data.data._id,
                                      index: newIndex
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
        const { dashboard } = this.props;
        const { title, term, areaOfStudy, deadline, positions, description } = this.state;

        return (
            <React.Fragment key="inputs">
                <h3> (Preview) This posting will be saved as: </h3>
                <Grid style={{marginLeft: 100, marginTop: 30}}>
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
                <Divider></Divider>
                <h3> Provide information to update posting: </h3>
                <Grid style={{marginLeft: 100, marginTop: 10}}>
                </Grid>
                <Grid>
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
                    style={{width: 650, fontSize: 18, marginLeft: 300, marginTop: 30}}
                    placeholder="Description of this research..."
                    onChange={(e) => updatePostForm(this, {
                        value: e.target.value, name: "description"})}/>
                </Grid>
                <Grid className="post-form__button-grid"
                      style={{marginLeft: 550}}>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editPost(this)}
                    className="save-button app_horizontal-center">
                    Save Post
                    </Button>
                </Grid>
                <div style={{height: 170}}></div>
            </React.Fragment>
        )
    }
}

export default withRouter(PostEditingPage);
