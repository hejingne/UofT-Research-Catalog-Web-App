import React from "react";
import CurrentPostList from "./../CurrentPostsList";
import PostForm from "./../PostForm";

import { addPost } from "./../action/PostModification";

class AllPosts extends React.Component {
  state = {
    title: "",
    areaOfStudy: "",
    deadline: new Date(),
    posts: [
      { area: "Life Science", title: "Computational Analytics", deadline: "May 28, 2020" },
      { area: "Engineering", title: "Geophysical Research Studies", deadline: "June 01, 2020" }
    ]
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleDateChange = date => {
    this.setState({
      deadline: date
    });
  }
  render() {
    return (
      <div className="App">

        <PostForm
          title={this.state.title}
          areaOfStudy={this.state.areaOfStudy}
          deadline={this.state.deadline}
          handleChange={this.handleInputChange}
          handleDateChange={this.handleDateChange}
          addPost={() => addPost(this)}
        />

        <CurrentPostList posts={this.state.posts} component={this} />
      </div>
    );
  }
}

export default AllPosts;
