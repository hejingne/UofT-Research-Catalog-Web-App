import api from "./../../../api";

export const editPost = (postEditingPage) => {
  api.editPost(postEditingPage.state).then((res) => {
    if (res.data.success) {
      alert("Posting updated successfully.")
    }
  })
}

export const removePost = (dashboardComp, index) => {
  api.deletePostForResearcher(dashboardComp.state.researcher_id, index).then((res) => {
    if (res.data.success) {
      alert("Posting removed successfully.")
      dashboardComp.setState({
        currentPostings: res.data.data.postings
      })
    }
  })
}

export const updatePostForm = (comp, field) => {
    const value = field.value;
    const name = field.name;

    comp.setState({
          [name]: value
    });
};
