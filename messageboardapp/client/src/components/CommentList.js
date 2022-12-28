import React, { useState, useContext } from 'react';
import { UserContext } from './context/UserProvider.js';
import Comment from './Comment.js';

export default function CommentList({ comments, postId }){
    const {
        user,
    } = useContext(UserContext);

    const [ toggle, setToggle ] = useState(false);
    const commTitle = comments.length > 0 ? `Click to view ${comments.length} comments` : 'No comments posted';

    const commentsMapped = comments && comments.map(comment =>
        <Comment
            date={comment.date}
            content={comment.content}
            author={comment.comAuth}
            deleteable={comment._authId === user._id}
            postId={postId}
            commentId={comment._id}
            key={comment._id}
        />
    );

    const commentsDisplayed = comments.length && <button onClick={() => setToggle(prevState => !prevState)}> close </button>;
    const commentsAreViewable = comments.length ?
        <h6 onClick={() => setToggle(prevState => !prevState)} style={{backgroundColor: 'transparent'}}> show {comments.length < 100 && comments.length} comments </h6>
    :
        <h6 style={{backgroundColor: 'transparent'}}> no comments </h6>;

    return (
        <div title={commTitle} className='commentContainer'>
            {toggle ?
                <div className='commentStyle'>
                    { commentsMapped }
                    { commentsDisplayed }
                </div>
                :
                <div className='commentStyle'>
                    { commentsAreViewable }
                </div>
            }
        </div>
    )
};