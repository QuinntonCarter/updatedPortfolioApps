// add border and flesh out component
import { useContext } from "react";
import { AppContext } from "./context/AppProvider";

// only delete comment if authId and user._id match
export default function Comment({ date, content, author, deleteable, postId, commentId }){
    const {
        deleteComment,
    } = useContext(AppContext);

    function validateDeletion(postId, commId){
        if (deleteable) {
            return deleteComment(postId, commId)
        } else {
            return new Error(`Error: cannot delete, this isn't your comment`)
        }
    };

    const canDeleteComment = deleteable &&
            <button
                onClick={() => validateDeletion(postId, commentId)}
                className='deleteBtn'
            > x </button>

    return (
        <div className="comment" style={{ display: 'grid', justifySelf: 'center' }}>
            <h5> {author} - {date} </h5>
            <p> {content} </p>
            {canDeleteComment}
        </div>
    )
};