import React from "react";
import "./App.css";
import { signInWithGoogle, auth, firestore } from "./firebase";

class App extends React.Component {
  state = {
    user: null
  };

  unsubsribeFromAuth = null;

  componentDidMount = () => {
    this.unsubsribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        let userRef = firestore.collection("users").doc(uid);
        let isUser = await userRef.get();

        if (isUser.exists) {
          this.setState({
            user: { ...isUser.data() }
          });
        } else {
          let newUser = await userRef.set({
            uid,
            email,
            displayName,
            photoURL
          });
          this.setState({
            user: { ...newUser.data() }
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.unsubsribeFromAuth();
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <h1>hi</h1>
        {!this.state.user ? (
          <button onClick={signInWithGoogle}>sign in</button>
        ) : (
          <div>
            <button
              onClick={() => {
                auth.signOut();
                this.setState({
                  user: false
                });
              }}
            >
              sign out
            </button>
            <div>
              <h1>Currently signed in as: {this.state.user.displayName}</h1>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
