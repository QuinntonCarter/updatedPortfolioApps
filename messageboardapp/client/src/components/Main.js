import React, { useContext } from 'react';
import { UserContext } from './context/UserProvider.js';

import PostForm from './forms/PostForm.js';
import PostList from './PostList.js';

export default function Profile(){
    const {
        user: { username },
    } = useContext(UserContext);

    return(
        <>
            <h1 className='header'> hello, @{ username } </h1>
            <h3> create a post </h3>
            <PostForm/>
            <PostList/>
        </>
    )
}