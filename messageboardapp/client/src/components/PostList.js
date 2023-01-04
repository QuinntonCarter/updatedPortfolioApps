import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./context/AppProvider.js";
// import { UserContext } from './context/UserProvider.js';
import Posts from "./Posts.js";

export default function PostList() {
  const { posts } = useContext(AppContext);
  const [postView, setPostView] = useState();

  const initView = posts.allPosts.map((post) => {
    return <Posts {...post} _id={post._id} userId={post.user} key={post._id} />;
  });
  const newestSort = posts.allPosts
    .map((post) => {
      return (
        <Posts {...post} _id={post._id} userId={post.user} key={post._id} />
      );
    })
    .reverse();
  const unpopularSort = posts.allPosts
    .sort((a, b) => a.votes - b.votes)
    .map((post) => {
      return (
        <Posts {...post} _id={post._id} userId={post.user} key={post._id} />
      );
    });
  // sort by likes
  const popularSort = posts.allPosts
    .sort((a, b) => b.votes - a.votes)
    .map((post) => {
      return (
        <Posts {...post} _id={post._id} userId={post.user} key={post._id} />
      );
    });

  useEffect(() => {}, []);

  function setView(option) {
    switch (option) {
      case "popular":
        setPostView(popularSort);
        break;
      case "unpopular":
        setPostView(unpopularSort);
        break;
      case "newest":
        setPostView(newestSort);
        break;
      case "init":
        setPostView(initView);
        break;
      default:
    }
  }

  useEffect(() => {
    return () => {
      setPostView("");
    };
  }, []);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="postList">
      <div className="sortViewBar">
        <select onChange={(e) => setView(e.target.value)}>
          <option value={"init"}> all posts </option>
          <option value={"popular"}> popular </option>
          <option value={"newest"}> newest </option>
          <option value={"unpopular"}> unpopular </option>
        </select>
      </div>
      {postView ? postView : initView}
    </div>
  );
}
