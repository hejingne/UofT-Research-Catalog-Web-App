import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { removePost } from "./../action/PostModification";
import "./styles.css";

/* class representing each line of CurrentPostList*/
class Post extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {id: 0};
  //   this.randomIdGenerator = this.randomIdGenerator.bind(this);
  // }
  //
  // randomIdGenerator() {
  //   const min = 1;
  //   const max = 100;
  //   const rand = min+Math.random()*(max-min);
  //   this.setState({id: this.state.id+rand});
  // }

  render() {
    const { post, component } = this.props;

    return (
      <TableRow className="post" key={post.title}>
        <TableCell component="th" scope="row">{post.areaOfStudy}</TableCell>
        <TableCell component="th" scope="row">2020-2021</TableCell>
        <TableCell component="th" scope="row">{post.id}</TableCell>
        <TableCell component="th" scope="row">{post.title}</TableCell>
        <TableCell component="th" scope="row">{post.positions}</TableCell>
        <TableCell component="th" scope="row">{post.deadline}</TableCell>
        <TableCell component="th" scope="row">
          <Button
            variant="contained"
            color="primary"
            onClick={removePost.bind(this, component, post)}>remove
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default Post;
