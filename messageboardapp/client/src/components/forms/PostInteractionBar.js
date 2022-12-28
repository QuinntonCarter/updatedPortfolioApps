import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserProvider.js';
import { AppContext } from '../context/AppProvider.js';
import CommentList from '../CommentList.js';

export default function PostInteractionBar({
        comments,
        setPostComments,
        votes,
        _id,
        _userId,
        userString,
        voted,
        userId
    }){
    
    const { 
        user
    } = useContext(UserContext);

    const {
        deleteComment,
        submitVote,
        postComment,
        appError,
        setAppError,
    } = useContext(AppContext);
    
    const initInputs = {
        content: '',
        comAuth: `${user.username}`,
        _authId: ``,
        date: new Date()
    };

    const [ inputs, setInputs ] = useState(initInputs);
    const [ toggleReply, setToggleReply ] = useState(false);

    const isCommentAuthor = userId === user._id;

    function handleChange(e){
        const { name, value } = e.target
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    };
    
    function voteValidation(vote, userId, id, username){
        const userHasVoted = voted.includes(username);
        if (userHasVoted) {
            setAppError(`Error: you've already voted here`)
        } else {
            submitVote(vote, userId, id)
        }
    };

    async function submitComment(e, postId) {
        e.preventDefault();
        await postComment(postId, inputs)
            .then(data => setPostComments(data))
            .catch(error => setAppError(error));
        await setInputs(initInputs);
        await setToggleReply(false);
    };

    function handleDelete(postId, id) {
        deleteComment(postId, id)
            .then(data => console.log(data))
            .catch(error => setAppError(error));
    };

    useEffect(() => {
        console.log(comments)
    }, [comments]);

    return (
        <div className='interactionStyle'>
            <h4 title='# of votes'>
                <i
                    onClick={() => voteValidation("upvote", _userId, _id, user.username)}
                    title={ userString === user.username ? 'cannot vote on your own content' : 'upvote' || voted.includes(user.username) ? `you've already voted` : `upvote` } className='fas fa-thumbs-up'/>
                {votes}
                <i
                    onClick={() => voteValidation("downvote", _userId, _id, user.username)}
                    title={ userString === user.username ? 'cannot vote on your own content' : 'downvote' || voted.includes(user.username) ? `you've already voted` : `downvote` } className='fas fa-thumbs-down'/>
            </h4>
            <h6 className='comments'> { comments.length } comments </h6>
            { !toggleReply ?
                <h6
                    title='open reply form'
                    onClick={() => setToggleReply(prevState => !prevState)}
                    className='replyBtn'
                    style={{
                        cursor: 'pointer',
                        textDecoration: 'underline'
                }}> reply </h6>
                :
                <div className='commentAreaStyle'>
                    <form>
                        <textarea
                            onChange={handleChange}
                            placeholder={`what's good?`}
                            className='commentArea'
                            name='content'
                            value={inputs.content}
                        />
                        <button
                            onClick={(e) => submitComment(e, _id)}
                            style={{color: 'rgb(233, 110, 110)'}}
                        > reply </button>
                        <button
                            onClick={
                                () => setToggleReply(prevState => !prevState)
                            }
                        > cancel </button>
                    </form>
                </div>
            }
            { isCommentAuthor &&
                <button
                    onClick={() => handleDelete(_id)}
                    className='deleteBtn'
                > delete </button>
            }
            <CommentList
                postId={_id}
                comments={comments}
                key={_id}
            />
        </div>
    )
};