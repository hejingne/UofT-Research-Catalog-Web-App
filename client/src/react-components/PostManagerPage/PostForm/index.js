import React from "react";
// import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";
// import MomentUtils from "@date-io/moment";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

import "./styles.css";
import "react-datepicker/dist/react-datepicker.css"

class PostForm extends React.Component {
  render() {
    const {
      title,
      positions,
      areaOfStudy,
      deadline,
      handleChange,
      addPost
    } = this.props;

    return (
      <Grid className="post-form" container spacing={2}>
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

        <Input
          name="positions"
          value={positions}
          onChange={handleChange}
          label="Number Of Positions"
        />
          <Input
            name="deadline"
            value={deadline}
            onChange={handleChange}
            label = "deadline (MM/DD/YY)"
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
