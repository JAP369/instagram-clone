import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({ username, imageURL, caption }) {
  return (
    <div className='post'>
      {/* header -> avatar + username */}
      <div className='post__header'>
        <Avatar
          className='post__avatar'
          alt='Jon89AP'
          src='http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png'
        />
        <h3>{username}</h3>
      </div>

      {/* image */}
      <img className='post__image' src={imageURL}></img>

      {/* usernamme + caption */}
      <h4 className='post__text'>
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
}

export default Post;
