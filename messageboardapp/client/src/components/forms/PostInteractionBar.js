import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider.js";
import { AppContext } from "../context/AppProvider.js";
import CommentList from "../CommentList.js";

export default function PostInteractionBar({
  comments,
  setPostComments,
  votes,
  _id,
  _userId,
  userString,
  voted,
}) {
  const { user } = useContext(UserContext);

  const { submitVote, postComment } = useContext(AppContext);
  const { setAppError } = useContext(UserContext);

  const initInputs = {
    content: "",
    comAuth: `${user.username}`,
    _authId: ``,
    date: new Date(),
  };

  const [inputs, setInputs] = useState(initInputs);
  const [toggleReply, setToggleReply] = useState(false);
  const numberOfComments = comments && comments.length;
  const currentUserHasVoted = voted.includes(userString);
  const isCurrentUsersPost = _userId === user._id;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function voteValidation(vote, id) {
    if (currentUserHasVoted) {
      setAppError(`Error: you've already voted here`);
    }
    if (isCurrentUsersPost) {
      setAppError(`Error: You can't vote on your own post`);
    } else {
      submitVote(vote, _userId, id);
    }
  }

  async function submitComment(e, postId) {
    e.preventDefault();
    await postComment(postId, inputs)
      .then((data) => setPostComments(data))
      .catch((error) => setAppError(error));
    await setInputs(initInputs);
    await setToggleReply(false);
  }

  return (
    <div className="interactionStyle">
      <h4 title="# of votes">
        <i
          onClick={() => voteValidation("upvote", _id)}
          // **fix: refactor so it's more readable/eliminate 'already voted' bug
          title={
            userString === user.username
              ? "cannot vote on your own content"
              : "upvote" || voted.includes(user.username)
              ? `you've already voted`
              : `upvote`
          }
          className="fas fa-thumbs-up"
        />
        {votes}
        <i
          onClick={() => voteValidation("downvote", _id)}
          title={
            userString === user.username
              ? "cannot vote on your own content"
              : "downvote" || voted.includes(user.username)
              ? `you've already voted`
              : `downvote`
          }
          className="fas fa-thumbs-down"
        />
      </h4>
      <h6 className="comments"> {numberOfComments} comments </h6>
      {!toggleReply ? (
        <h6
          title="open reply form"
          onClick={() => setToggleReply((prevState) => !prevState)}
          className="replyBtn"
          style={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {" "}
          reply{" "}
        </h6>
      ) : (
        <div className="commentAreaStyle">
          <form>
            <textarea
              onChange={handleChange}
              placeholder={`what's good?`}
              className="commentArea"
              name="content"
              value={inputs.content}
            />
            <button
              onClick={(e) => submitComment(e, _id)}
              style={{ color: "rgb(55, 102, 255)" }}
            >
              {" "}
              reply{" "}
            </button>
            <button onClick={() => setToggleReply((prevState) => !prevState)}>
              {" "}
              cancel{" "}
            </button>
          </form>
        </div>
      )}
      <CommentList
        postId={_id}
        comments={comments}
        setPostComments={setPostComments}
        key={_id}
      />
    </div>
  );
}
