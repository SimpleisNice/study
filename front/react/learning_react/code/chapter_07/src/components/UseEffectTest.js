import React, { useState, useEffect } from 'react';

function UseEffectTest() {
  const [posts, setPosts] = useEffect([]);
  const addPost = post => setPosts(allPosts => [post, ...allPosts]);

  useEffect(() => {
    newsFeed.subscribe(addPost);
    welcomeChime.play();

    return () => {
      newsFeed.unsubscribe(addPost);
      goodbyeChime.play();
    }
  })

  return (
    <></>
  )
}

export default UseEffectTest;