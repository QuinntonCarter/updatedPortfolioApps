import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PostInteractionBar from "./forms/PostInteractionBar.js";
import { UserContext } from "./context/UserProvider.js";
import { AppContext } from "./context/AppProvider.js";

export default function Posts({
  userId,
  userString,
  votedUsers,
  title,
  content,
  imgSrc,
  comment,
  posted,
  votes,
  _id,
}) {
  const { user } = useContext(UserContext);

  const { deletePost } = useContext(AppContext);

  const [postComments, setPostComments] = useState(comment);
  const isPostAuthor = userId === user._id;

  return (
    <div className="postStyle">
      <a
        title="View full size image"
        href={imgSrc}
        rel="noreferrer"
        target="_blank"
      >
        <img src={imgSrc} alt={imgSrc} />
      </a>
      <div className="postDesc">
        <Link
          to={`/posts/${_id}`}
          style={{ color: "rgb(55, 102, 255)", fontSize: "12px" }}
        >
          <h3>
            {" "}
            {title}
            <br />
            <span className="date">
              {" "}
              {`>>${userString}`} on {posted.slice(0, 10)}{" "}
            </span>
            <span className="date"> @ {posted.slice(11, 16)} </span>
          </h3>
        </Link>
        <p> {content} </p>
      </div>
      {isPostAuthor && (
        <button
          onClick={() => deletePost(_id)}
          className="deleteBtn"
          title="Click here to delete this post"
        >
          {" "}
          Delete Post{" "}
        </button>
      )}
      <PostInteractionBar
        commLength={comment.length}
        votes={votes}
        voted={votedUsers}
        comments={postComments}
        setPostComments={setPostComments}
        _id={_id}
        _userId={userId}
        userString={userString}
      />
    </div>
  );
}
