import React from 'react';
import Post from './Post';

const Content = ({ content, onFilter }) => {
  return (
    <>
      {content.map((post) => {
        return <Post key={post.path} post={post} onFilter={onFilter} />;
      })}
    </>
  );
};

export default Content;
