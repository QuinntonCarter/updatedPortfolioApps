// **fix: add border and flesh out component
import { useContext } from "react";
import { AppContext } from "./context/AppProvider";

export default function Comment({
        date,
        content,
        comAuth,
        userIsAuthor,
        postId,
        _id,
        setPostComments,
    }){
    const {
        deleteComment,
        appError,
        setAppError
    } = useContext(AppContext);

    async function validateDeletion(postId, commId) {
        if (userIsAuthor) {
            try {
                await deleteComment(postId, commId)
                    .then(data => setPostComments(data))
                    .catch(error => setAppError(error));
            } catch (error) {
                setAppError({ status: error.response.status, msg: error.response.statusText })
            }
        } else {
            return setAppError({ status: '', msg: "Error: cannot delete, this isn't your comment" });
        }
    };

    const canDeleteComment = userIsAuthor &&
            <button
                onClick={() => validateDeletion(postId, _id)}
                className='deleteBtn'
            > Delete Comment </button>;

    return (
        <div className="comment" style={{ display: 'grid', justifySelf: 'center' }}>
            <h5> { comAuth } - { date } </h5>
            <p> { content } </p>
            { canDeleteComment }
            <h5> {appError && `${appError.status} ${appError.msg}`} </h5>
        </div>
    )
};