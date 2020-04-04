import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { restorePost } from "./../../action/posts";
import "./styles.css";
import PostEditingPage from "./../../PostEditingPage";

class RemovedPost extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { post, index, dashboard } = this.props;
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
            onClick={() => restorePost(dashboard, index)}>restore
          </Button>
        </TableCell>
        <TableCell component="th" scope="row" ></TableCell>
        </TableRow>
    );
  }
}

export default RemovedPost;
