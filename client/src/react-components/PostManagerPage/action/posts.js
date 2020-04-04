import api from "./../../../api";

export const restorePost = (dashboardComp, index) => {
  api.restorePostForResearcher(dashboardComp.state.researcher_id, index).then((res) => {
    if (res.data.success) {
      alert("Success: Posting restored successfully.")
      dashboardComp.setState({
        currentPostings: res.data.data.postings,
        removedPostings: res.data.data.removedPostings
      })
    }
  })
}

export const editPost = (postEditingPage) => {
    api.editPost(postEditingPage.state).then((res) => {
        if (res.data.success) {
            alert("Success: Posting updated successfully.")
        }
    })
}

export const removePost = (dashboardComp, index) => {
    api.deletePostForResearcher(dashboardComp.state.researcher_id, index).then((res) => {
        if (res.data.success) {
            alert("Success: Posting removed successfully.")
            dashboardComp.setState({
              currentPostings: res.data.data.postings,
              removedPostings: res.data.data.removedPostings
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
