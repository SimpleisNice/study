import React, { useState, useEffect, useMemo, } from 'react';

function NewsFeed() {
  const [_posts, setPosts] = useState([]);
  const addPost = post => setPosts(allPosts => [post, ...allPosts]);
  const posts = useMemo(() => _posts, [_posts]);

  useEffect(() => {
    newPostChime.play();
  }, [posts]);

  useEffect(() => {
    NewsFeed.subscribe(addPost);
    return () => NewsFeed.unsubscribe(addPost);
  }, []);

  useEffect(() => {
    welcomeChime.play();
    return () => goodbyeChime.play();
  }, []);

  return posts;
}
export default NewsFeed;