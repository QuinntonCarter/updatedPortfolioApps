import { useState, createContext, useContext, useEffect } from 'react';
// import axios from 'axios';
import { UserContext } from './UserProvider';

export const AppContext = createContext();

export default function AppContextProvider({ children }){
    const {
        user,
        userState,
        setUserState,
        userAxios,
        isLoading,
        setIsLoading
    } = useContext(UserContext);
    const [ posts, setPosts ] = useState({ userPosts: [], allPosts: [], foundPosts: [] });
    const [ comments, setComments ] = useState({ userComments: [], allComments: [], foundComments: [] });
    const [ appError, setAppError ] = useState();

    // CRUD
    // get all posts in DB
    async function getAllPosts(){
        try {
            const { data } = await userAxios.get('/api/posts');
            await setPosts(prevState => ({
                ...prevState,
                allPosts: data,
            }));
            return data;
        } catch (error){
            setAppError(error);
        }
    };

    // get a user's posts via id
    async function getUserPosts(userId){
        try {
            const { data } = await userAxios.get(`/api/posts/user`, {
                params: {
                    userId: userId
                }
            });
            await setPosts(prevState => ({
                ...prevState,
                userPosts: data,
            }));
            return data
        } catch (error) {
            setAppError(error);
        }
    };

    // new post POST
    async function addPost(newPost){
        try {
            const { data } = await userAxios.post('/api/posts', newPost);
            await setPosts(prevState => ({
                ...prevState,
                userPosts: prevState.userPosts.concat(data),
                allPosts: prevState.allPosts.concat(data)
            }));
            return data;
        } catch (error){
            setAppError(error);
        }
    };

    // DELETE post
    async function deletePost(postId){
        try {
            await setPosts(prevState => ({
                ...prevState,
                userPosts: prevState.userPosts.filter(post => post._id !== postId),
                allPosts: prevState.allPosts.filter(post => post._id !== postId),
            }))
            const { data } = await userAxios.delete(`/api/posts/delete`, {
                params: {
                    postId
                }
            });
            return data;
        } catch (error) {
            setAppError(error);
        }
    }

    // voting functionality
    function submitVote(vote, userId, postId){
        // **fix: move this outside of function into a variable **
        userId === user._id ?
            setAppError('Error: this is your own post or comment')
        :
            userAxios.put(`/api/posts/${vote}/${postId}`)
        .then(res => setPosts(prevState => [
            ...prevState,
            res.data 
            ]
        ))
        .catch(err => setAppError(err.response.data.errMsg))
    }

    // comments CRUD
    // GET all comments by user
    async function getUserComments(userId){
        try {
            const { data } = await userAxios.get(`/api/comment/user`, {
                params: {
                    userId
                }
            });
            await setComments(prevState => ({
                ...prevState,
                userComments: data,
            }))
            return data;
        } catch (error){
            setAppError(error);
        }
        // .catch(err => setAppError(err.response.data.errMsg))
    };

    // POST comment
    async function postComment(postId, newComment){
        // post comment to frontend state; post to DB + return amended comment array
        try {
            const { data } = await userAxios.put(`/api/comment/${postId}`, newComment);
            return data.comment;
        } catch (error) {
            return setAppError(error);
            // .catch(err => setAppError(err.response.data.errMsg))
        }
    };

    // DELETE comment ** check **
    async function deleteComment(postId, comId){
        try {
            const { data } = await userAxios.put(`/api/comment/delete/${postId}/${comId}`)
            // ** not updating comments upon delete **
            // **fix: is this returning the amended comment array? **
            return console.log(data.comment);
        } catch (error) {
            return setAppError(error);
            // .catch(err => setAppError(err.response.data.errMsg))
        }
    };

    // ** WIP ** 
    useEffect(() => {
        if(isLoading){
            setTimeout(() => {
                setIsLoading(false)
            }, 3000);
        }
    }, [isLoading]);

    // ** for testing **
    // useEffect(() => {
    //     console.log(posts);
    //     console.log(isLoading);
    // }, [posts]);

    useEffect(() => {
        if(userState.token){
            getAllPosts();
            getUserPosts(user._id);
        }
        return () => {
            setPosts({
                allPosts: [],
                userPosts: [],
                foundPosts: []
            })
        }
    }, []);

    return (
        <AppContext.Provider
        value={{
            posts,
            setPosts,
            comments,
            setComments,
            postComment,
            deleteComment,
            addPost,
            deletePost,
            getAllPosts,
            getUserPosts,
            getUserComments,
            appError,
            setAppError,
            submitVote,
        }}>
            {children}
        </AppContext.Provider>
    )
}