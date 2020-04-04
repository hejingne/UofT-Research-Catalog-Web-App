import React from "react";
import Button from "@material-ui/core/Button";
import Input from "./../Input";
import TextField from '@material-ui/core/TextField';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
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
                          }}
                        )
                    }});
        } else {
            return this.props.history.push("/signOut");
        }
    });
  }

  render() {
    const { index } = this.props;
    const { title, term, areaOfStudy, deadline, positions, description } = this.state;


    return (
      <React.Fragment key="inputs">
        <h3> This posting will be saved as: </h3>
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
        <h3> Provide information to update posting: </h3>
          <Input
            name="title"
            value={title}
            onChange={e => updatePostForm(this, e.target)}
            label="Post Title"
          />

          <Input
            name="areaOfStudy"
            value={areaOfStudy}
            onChange={e => updatePostForm(this, e.target)}
            label="Area Of Study"
          />

          <Input
            name="positions"
            value={positions}
            onChange={e => updatePostForm(this, e.target)}
            label="Number Of Positions"

          />

          <Input
            name="term"
            value={term}
            onChange={e => updatePostForm(this, e.target)}
            label="Term"
          />
            <Input
              name="deadline"
              value={deadline}
              onChange={e => updatePostForm(this, e.target)}
              label = "deadline (MM/DD/YY)"
            />

            <Input
              name="description"
              value={description}
              onChange={e => updatePostForm(this, e.target)}
              label = "description"
            />

          <Button
            variant="contained"
            color="primary"
            onClick={() => editPost(this)}
            className="save-button app_horizontal-center"
          >
            Save Post
          </Button>
        </React.Fragment>
      )
    }
  }

export default withRouter(PostEditingPage);
