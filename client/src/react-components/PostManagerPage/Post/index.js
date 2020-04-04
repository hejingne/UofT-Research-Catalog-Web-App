import React from "react";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { removePost } from "./../action/posts";
import "./styles.css";
import PostEditingPage from "./../PostEditingPage";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.editPost = this.editPost.bind(this);
    }

    editPost(index) {
        this.props.history.push("/edit-posting-for-researcher");
        return <PostEditingPage index={index} key={'key' + index} />;
    }

    render() {
        const { post, dashboard, index, history } = this.props;
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
                        onClick={() => this.editPost(index)}>edit
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
