import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { removePost } from "./../action/PostModification";
import "./styles.css";

/* class representing each line of CurrentPostList*/
class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {id: 2000};
    this.idGenerator = this.idGenerator.bind(this);
  }

  idGenerator() {this.setState({randomId: (this.state.id-1)*9})}

  render() {
    const { post, component } = this.props;

    return (
      <TableRow className="post" key={post.title}>
        <TableCell component="th" scope="row">{post.areaOfStudy}</TableCell>
        <TableCell component="th" scope="row">2020-2021</TableCell>
        <TableCell component="th" scope="row">{this.state.id}</TableCell>
        <TableCell component="th" scope="row">
          <Button
            variant="contained"
            color="secondary"
            onClick={removePost.bind(this, component, post)}>remove
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default Post;
