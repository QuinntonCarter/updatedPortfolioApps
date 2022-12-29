import { useContext, useEffect } from 'react';
import Posts from './Posts.js'
import Comment from './Comment.js';
import { AppContext } from './context/AppProvider.js';
import { UserContext } from './context/UserProvider.js';

export default function Profile(){
    const {
        user,
        user: { 
            username
        },
        user: {
            memberSince
        },
    } = useContext(UserContext);

    const {
        posts,
        getUserComments,
        comments,
        setComments,
        // appError,
        setAppError,
    } = useContext(AppContext);

    const userPostsMapped = posts.userPosts && posts.userPosts.map(posts =>
        <div className='profilePosts'>
            <Posts
                {...posts}
                _id={posts._id}
                userId={posts.user}
                key={posts._id}
            />
        </div>
    );

    // ** turn into comment component **
    const userCommentsMapped = comments.userComments ?
        comments.userComments.map(comment => <Comment {...comment} key={comment._id} />
        )
        : 
        <p> No comments to display </p>

    useEffect(() => {
        getUserComments(user._id)
        .then(res => 
            setComments({
                userComments: res
            })
        )
        .catch(err => setAppError(err))
    }, []);

    useEffect(() => {
        
    }, []);

    return(
        <div>
            <h1> @{ username } </h1>
            <h3> member since: { memberSince.slice(0,10) } </h3>
            <h3> posts: </h3>
            <section className="postsGrid">
                { userPostsMapped }
            </section>
            <h3> comments: </h3>
            <section className="commentsGrid">
                { userCommentsMapped }
            </section>
        </div>
    )
};