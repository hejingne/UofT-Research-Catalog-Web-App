export const addPost = allPosts => {

  const postList = allPosts.state.posts;

  allPosts.setState({
    id: allPosts.state.id+1
  });

  const post = {
    title: allPosts.state.title,
    areaOfStudy: allPosts.state.areaOfStudy,
    deadline: allPosts.state.deadline,
    positions: allPosts.state.positions,
    id: allPosts.state.id
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
