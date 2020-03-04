import React from "react";
import CurrentPostList from "./../CurrentPostList";
import PostForm from "./../PostForm";

import { addPost } from "./../action/PostModification";

class AllPosts extends React.Component {
  state = {
    title: "",
    areaOfStudy: "",
    deadline: "",
    positions: "",
    id: 20002,
    posts: [
      { areaOfStudy: "Life Science", title: "Computational Analytics", id: "20000", positions: "2", deadline: "05/28/2020",  },
      { areaOfStudy: "Engineering", title: "Geophysical Research Studies", id: "20001", positions: "4", deadline: "06/01/2020" }
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

  render() {
    return (
      <div className="App">

        <PostForm
          title={this.state.title}
          positions={this.state.positions}
          areaOfStudy={this.state.areaOfStudy}
          deadline={this.state.deadline}
          id={this.state.id}
          handleChange={this.handleInputChange}
          handleIdChange={this.handleIdChange}
          addPost={() => addPost(this)}
        />

        <CurrentPostList posts={this.state.posts} component={this} />
      </div>
    );
  }
}

export default AllPosts;
