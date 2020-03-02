export const addPost = allPosts => {

  const postList = allPosts.state.posts;

  const post = {
    title: allPosts.state.title,
    areaOfStudy: allPosts.state.areaOfStudy,
    deadline: allPosts.state.deadline
  };

  postList.push(post);

  allPosts.setState({posts: postList});
};

export const removePost = (allPosts, post) => {
  const filteredPosts = allPosts.state.posts.filter(p => {
    return p !== post;
  });

  allPosts.setState({posts: filteredPosts});
};
