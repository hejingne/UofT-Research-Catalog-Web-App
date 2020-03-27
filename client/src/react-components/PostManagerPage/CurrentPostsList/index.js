import React from "react";
// import {uid} from "react-uid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Post from "./../Post";

import "./styles.css";

/* Component for the List of CurrentPosts */
class CurrentPostList extends React.Component {
  render() {
    const { posts, component } = this.props;

    /* iterate through the post list and make an <li> for each post*/
    return (  /*changed*/
      <Table className="post-list">
        <TableBody>
          <h2> Current Research Postings: </h2>
          <TableRow className="post">
            <TableCell component="th" scope="row">Area Of Study</TableCell>
            <TableCell component="th" scope="row">Term</TableCell>
            <TableCell component="th" scope="row">Post ID</TableCell>
            <TableCell component="th" scope="row">Title</TableCell>
            <TableCell component="th" scope="row">Available Positions</TableCell>
            <TableCell component="th" scope="row">Deadline</TableCell>
            <TableCell component="th" scope="row"></TableCell>
          </TableRow>

          {posts.map(post => (
            <Post
              // key={uid(post)}
              post={post}
              component={component}
            />
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default CurrentPostList;
