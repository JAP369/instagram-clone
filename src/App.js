import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        // user has logged out...
        setUser(null);
      }
    });
    return () => {
      // perform some cleanup action
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);

  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({ displayName: username });
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (e) => {};

  return (
    <div className='app'>
      <Modal
        className='app__modal'
        open={open}
        onClose={() => {
          setOpen(false);
        }}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup' action=''>
            <center>
              <img
                className='app__headerImage'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/120px-Instagram_logo.svg.png'
                alt=''
              />
            </center>
            <Input placeholder='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUp}>
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>
      <Modal
        className='app__modal'
        open={openSignIn}
        onClose={() => {
          setOpenSignIn(false);
        }}>
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup' action=''>
            <center>
              <img
                className='app__headerImage'
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/120px-Instagram_logo.svg.png'
                alt=''
              />
            </center>
            <Input placeholder='email' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <div className='app__header'>
        <img
          className='app__headerImage'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/120px-Instagram_logo.svg.png'
          alt=''
        />
      </div>

      {user ? (
        <Button
          onClick={() => {
            auth.signOut();
          }}>
          Logout
        </Button>
      ) : (
        <div className='app__loginContainer'>
          <Button
            onClick={() => {
              setOpenSignIn(true);
            }}>
            Sign In
          </Button>
          <Button
            onClick={() => {
              setOpen(true);
            }}>
            Sign Up
          </Button>
        </div>
      )}

      <h1>INSTAGRAM CLONE</h1>
      {/* open a curly bracket to input javascript
      input useState name and use map function
      within the map function: create a function called 'post'
      then return the 'post' component
      inside the component: apply the props */}
      {posts.map(({ id, post }) => (
        <Post key={id} username={post.username} caption={post.caption} imageURL={post.imageURL} />
      ))}
    </div>
  );
}

export default App;
