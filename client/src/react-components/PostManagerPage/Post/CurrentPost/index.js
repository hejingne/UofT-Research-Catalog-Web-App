import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { removePost } from "./../../action/posts";
import "./styles.css";
import PostEditingPage from "./../../PostEditingPage";
import api from "./../../../../api";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.editPost = this.editPost.bind(this);
  }

  editPost(dashboard, newIndex) {
    this.props.history.push("/edit-posting-for-researcher");
    api.updateIndexForResearcher(dashboard.state.researcher_id, newIndex).then((res) => {
        alert("Index updated"); //test
    })
    return <PostEditingPage dashboard={dashboard} key={'key-for-editing'}/>;
  }

  render() {
    const { post, index, dashboard, history } = this.props;
    const {
      title,
      term,
      areaOfStudy,
      deadline,
      positions,
      description
    } = post;

    return (
      <TableRow className="post">
        <TableCell component="th" scope="row" >{areaOfStudy}</TableCell>
        <TableCell component="th" scope="row" >{term}</TableCell>
        <TableCell component="th" scope="row" >{title}</TableCell>
        <TableCell component="th" scope="row" >{positions}</TableCell>
        <TableCell component="th" scope="row" >{deadline}</TableCell>
        <TableCell component="th" scope="row" >{description}</TableCell>
        <TableCell component="th" scope="row" >
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.editPost(dashboard, index)}>edit
          </Button>
          </TableCell>
          <TableCell component="th" scope="row" >
          <Button
            variant="contained"
            color="primary"
            onClick={() => removePost(dashboard, index)}>remove
          </Button>
        </TableCell>
        </TableRow>
    );
  }
}

export default Post;
