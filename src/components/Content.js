import React from 'react';
import Post from './Post';

const Content = ({ content }) => {
  return (
    <>
      {content.map((post) => {
        return <Post key={post.path} post={post} />;
      })}
    </>
  );
};

export default Content;
