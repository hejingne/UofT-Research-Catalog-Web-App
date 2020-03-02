import React from "react";
// import DateFnsUtils from "@date-io/date-fns"; //lib
import DatePicker from "react-datepicker";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

import "./styles.css";
import "react-datepicker/dist/react-datepicker.css"

class PostForm extends React.Component {
  render() {
    const {
      title,
      areaOfStudy,
      deadline,
      handleChange,
      handleDateChange,
      addPost
    } = this.props;

    return (
      <Grid className="post-form" container spacing={4}>
        <Input
          name="title"
          value={title}
          onChange={handleChange}
          label="Post Title"
        />

        <Input
          name="areaOfStudy"
          value={areaOfStudy}
          onChange={handleChange}
          label="Area Of Study"
        />

        <DatePicker
          selected={deadline}
          onChange={handleDateChange}
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
            onClick={addPost}
            className="post-form__submit-button"
          >
            Add Post
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default PostForm;
