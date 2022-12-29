// **fix: add border and flesh out component
import { useContext } from "react";
import { AppContext } from "./context/AppProvider";

// only delete comment if authId and user._id match
export default function Comment({
        date,
        content,
        author,
        userIsAuthor,
        postId,
        commentId,
        setPostComments
    }){
    const {
        deleteComment,
        setAppError
    } = useContext(AppContext);

    async function validateDeletion(postId, commentId) {
        if (userIsAuthor) {
            await deleteComment(postId, commentId)
                .then(data => setPostComments(data))
                .catch(error => setAppError(error));
        } else {
            return setAppError(`Error: cannot delete, this isn't your comment`);
        }
    };

    const canDeleteComment = userIsAuthor &&
            <button
                onClick={() => validateDeletion(postId, commentId)}
                className='deleteBtn'
            > Delete Comment </button>;

    return (
        <div className="comment" style={{ display: 'grid', justifySelf: 'center' }}>
            <h5> {author} - {date} </h5>
            <p> {content} </p>
            {canDeleteComment}
        </div>
    )
};