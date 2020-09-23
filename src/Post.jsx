import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import firebase from 'firebase';

function Post({ user, postId, username, imageURL, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  };

  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar
          className='post__avatar'
          alt='Jon89AP'
          src='http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png'
        />
        <h3>{username}</h3>
      </div>

      <img className='post__image' src={imageURL}></img>

      <h4 className='post__text'>
        <strong>{username}</strong> {caption}
      </h4>

      <div className='post__comments'>
        {comments.map((comment) => (
          <p>
            <strong>{comment.username} </strong>
            {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className='post__commentBox' action=''>
          <input
            className='post__input'
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            type='text'
            placeholder='Add a comment...'
          />
          <button
            className='post__button'
            type='submit'
            onClick={postComment}
            disabled={!comment}>
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
