import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "./../Input";
import TextField from '@material-ui/core/TextField';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Post from "./../Post";
import "./styles.css";
import { updatePostForm } from "./../action/posts"
import { withRouter } from "react-router-dom";
import api from "./../../../api"

class PostsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.addPost = this.addPost.bind(this);
    this.updatePostings = this.updatePostings.bind(this);

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
      currentPostings:[]
    };
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
                            this.setState({researcher_id: res.data.data._id}) // retrieve id
                          }}
                          ,(error) => {
                            api.startMakingPosts(this.state.postManager).then((res) => {
                              if (res.data.success) {
                                this.setState({researcher_id: res.data.data._id}) // create id
                              }
                            })}
                        )
                    }});
        } else {
            return this.props.history.push("/signOut");
        }
    });
  }

  updatePostings() {
    api.getResearcherByEmail(this.state.postManager.email).then((res) => {
        this.setState({
          currentPostings: res.data.data.postings
        })
    })
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
          }})
      })
  }

  render() {
    const { title, term, areaOfStudy, deadline, positions, description } = this.state;
    return (
      <React.Fragment key="table">
        <Grid className="post-form" container spacing={4}>
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
          <Grid
            className="post-form__button-grid"
            item
            xl={2}
            lg={2}
            md={12}
            s={12}
            xs={12}
          >
          <Button
            variant="contained"
            color="primary"
            onClick={this.addPost}
            className="post-form__submit-button app_horizontal-center"
          >
            Create Post
          </Button>
          </Grid>
        </Grid>

        <p className={`post-form__message--${this.state.message.type}`}>
          {this.state.message.body}
        </p>

        <Button
        id="viewButton"
        onClick={this.updatePostings}
        className="post-list__button app_horizontal-center"
        variant="contained"
        > View Current Research Postings
        </Button>

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
                key={'key'+i}/> //key
            })}
          </TableBody>
        </Table>
        </React.Fragment>
    )
  }
}

export default withRouter(PostsDashboard);