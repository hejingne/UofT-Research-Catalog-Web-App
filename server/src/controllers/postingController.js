const Posting = require("../models/posting")

updateIndexForResearcher = async (req, res) => {
    const id = req.params.id;
    const newIndex = req.params.index;

    await Posting.findOneAndUpdate(
        { _id: id },
        { $set: { index: newIndex } },
        { new: true }
    )
        .then((researcher) => {
            if (!researcher) {
                res.status(404).send();
            } else {
                res.status(200).json({
                    success: true
                });
            }
        })
        .catch((error) => {
            res.status(400).send();
        });
};

restorePostForResearcher = async (req, res) => {
  await Posting.findOne(    // findOne instead of find
    { _id: req.params.id},
    (error, researcher) => {
      if (error) {
        return res.status(400).json({success: false, error: error});
      }
      if (!researcher) {
        return res.status(404).json({success: false, error: "researcher not found"});
      }
      const index = req.params.index;
      const restoredPost = researcher.removedPostings[index]
      if (researcher.removedPostings.length !== 0) {
        researcher.removedPostings.splice(index, 1);
      }
      researcher.postings.push(restoredPost);   // add to postings
      researcher.save((error) => {
      if (error) {return res.status(400).json({success: false, error: "can not save new changes"});}
      else {return res.status(200).json({success: true, data: researcher});}
      })
    }
  ).catch((error) => {
    return res.status(404).json({success: false, error});
  })
}

getResearches = async (req, res) => {
    if (!req.session.user) {
        return res
            .status(401)
            .json({ success: false, message: "user unauthorized" });
    }
    await Posting.find({}, (error, postings) => {
        if (error) {
            return res.status(500).json({ success: false, error: error });
        }
        if (!postings) {
            return res
                .status(404)
                .json({ success: false, error: "postings not found" });
        }
        return res.status(200).json({ success: true, data: postings });
    }).catch((error) => {
        return res.status(404).json({ success: false, error: error });
    });
};

editPost = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "data not found"
        });
    }
    const postingSchema = {
        title: body.title,
        term: body.term,
        areaOfStudy: body.areaOfStudy,
        deadline: body.deadline,
        positions: body.positions,
        description: body.description
    }
    await Posting.findOne(
        { _id: body.researcher_id },
        (error, researcher) => {
            if (error) {
                return res.status(400).json({ success: false, error: error });
            }
            if (!researcher) {
                return res.status(404).json({ success: false, erorr: "researcher not found" });
            }
            const index = body.index;
            if (researcher.postings.length !== 0) {
                researcher.postings.splice(index, 1);
            }

            researcher.postings.push(postingSchema);

            researcher.save((error) => {
                if (error) { return res.status(400).json({ success: false, error: "can not save new changes" }); }
                else { return res.status(200).json({ success: true, data: researcher }); }
            })
        }
    ).catch((error) => {
        return res.status(400).json({ success: false, error: "posting not created" });
    })
}

createPostForResearcher = async (req, res) => {
    // if (!req.session.user) {
    //     return res.status(401).json({
    //         success: false,
    //         message: "user unauthorized"
    //     });
    // }
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "data not found"
        });
    }
    const postingSchema = {
        title: body.title,
        term: body.term,
        areaOfStudy: body.areaOfStudy,
        deadline: body.deadline,
        positions: body.positions,
        description: body.description
    }
    await Posting.findOne(
        { _id: body.researcher_id },
        (error, researcher) => {
            if (error) {
                return res.status(400).json({ success: false, error: error });
            }
            if (!researcher) {
                return res.status(404).json({ success: false, erorr: "researcher not found" });
            }
            researcher.postings.push(postingSchema);
            researcher.save((error) => {
                if (error) { return res.status(400).json({ success: false, error: "can not save new changes" }); }
                else { return res.status(200).json({ success: true, data: researcher }); }
            })
        }
    ).catch((error) => {
        return res.status(400).json({ success: false, error: "posting not created" });
    })
}

deletePostForResearcher = async (req, res) => {
    await Posting.findOne(    // findOne instead of find
        { _id: req.params.id },
        (error, researcher) => {
            if (error) {
                return res.status(400).json({ success: false, error: error });
            }
            if (!researcher) {
                return res.status(404).json({ success: false, error: "researcher not found" });
            }
            const index = req.params.index;
            const deletedPost = researcher.postings[index];
            if (researcher.postings.length !== 0) {
                researcher.postings.splice(index, 1);
            }
            researcher.removedPostings.push(deletedPost);   // add to removedPostings
            researcher.save((error) => {
                if (error) { return res.status(400).json({ success: false, error: "can not save new changes" }); }
                else { return res.status(200).json({ success: true, data: researcher }); }
            })
        }
    ).catch((error) => {
        return res.status(404).json({ success: false, error });
    })
}

getResearcherByEmail = async (req, res) => {
    await Posting.findOne(
        { email: req.params.email },
        (error, researcher) => {
            if (error) {
                return res.status(400).json({ success: false, error: "all info needed" });
            }
            if (!researcher) {
                return res.status(404).json({ success: false, error: "researcher not found" });
            }
            return res.status(200).json({ success: true, data: researcher });
        }
    ).catch((error) => {
        return res.status(404).json({ success: false, error });
    })
}

startMakingPosts = async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: "user unauthorized"
        });
    }

    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "data not found"
        });
    }

    const posting = new Posting({
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        index: 0,
        postings: [],
        removedPostings: []
    })
    posting.save().then(() => {
        return res.status(200).json({
            success: true,
            data: posting
        });
    })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                error
            });
        })
}


module.exports = {
    getResearches,
    createPostForResearcher,
    getResearcherByEmail,
    startMakingPosts,
    deletePostForResearcher,
    editPost,
    restorePostForResearcher,
    updateIndexForResearcher
};
