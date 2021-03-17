import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function App() {
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var provider = new firebase.auth.GoogleAuthProvider();
  var ghProvider = new firebase.auth.GithubAuthProvider();

  const [user, setUser] = useState({});

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email);
      });
  };

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(ghProvider)
      .then((result) => {
        var credential = result.credential;

        var token = credential.accessToken;

        var user = result.user;
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        var email = error.email;

        var credential = error.credential;
        console.log(errorCode, errorMessage, email);
      });
  };

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      <br />
      <button onClick={handleFacebookSignIn}>Sign In with Facebook</button>
      <br />
      <button onClick={handleGithubSignIn}>Sign In with Github</button>
      <br />
      <h3>Email: {user.email}</h3>
      <h3>Name: {user.displayName}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
