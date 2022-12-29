import React, { useState, useContext } from 'react';
import { UserContext } from './context/UserProvider.js';
import Comment from './Comment.js';

export default function CommentList({ comments, setPostComments, postId }){
    const {
        user,
    } = useContext(UserContext);

    const commentsPresent = comments && comments.length;
    const canToggle = commentsPresent;
    const [ toggle, setToggle ] = useState(false);
    const commTitle = comments ? `${comments.length} comments` : 'No comments posted';

    const commentsMapped = comments &&
        comments.map(comment =>
            <Comment
                date={comment.date}
                content={comment.content}
                author={comment.comAuth}
                userIsAuthor={comment._authId === user._id}
                postId={postId}
                commentId={comment._id}
                setPostComments={setPostComments}
                key={comment._id}
            />
    );

    return (
        <div title={commTitle} className='commentContainer'>
            {
                toggle ?
                    <div className='commentStyle'>
                        { commentsMapped }
                        { comments && <button onClick={() => setToggle(prevState => !prevState)}> close </button> }
                    </div>
                :
                    <div className='commentStyle'>
                        <h6 onClick={() => 
                            setToggle(prevState => !prevState)} 
                            style={{backgroundColor: 'transparent', pointerEvents: canToggle ? 'auto' : 'none' }}
                        > 
                            {commentsPresent ? `show ${comments.length}` : 'no'} comments 
                        </h6>
                    </div>
            }
        </div>
    )
};