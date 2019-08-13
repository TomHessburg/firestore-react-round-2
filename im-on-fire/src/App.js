import React from "react";
import "./App.css";
import VideoElement from "./components/VideoElement";

import { signInWithGoogle, auth, firestore } from "./firebase";

class App extends React.Component {
  state = {
    user: null,
    accountType: "basic"
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
            user: { ...isUser.data() },
            accountType: ""
          });
        } else {
          await userRef.set({
            uid,
            email,
            displayName,
            photoURL,
            accountType: this.state.accountType
          });

          let userReturn = await userRef.get();

          this.setState({
            user: { ...userReturn.data() },
            accountType: ""
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
          <div>
            <button onClick={signInWithGoogle}>sign in</button>
            <br />
            <input
              type="text"
              value={this.state.accountType}
              onChange={e => {
                this.setState({
                  accountType: e.target.value
                });
              }}
            />
          </div>
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
              <VideoElement user={this.state.user} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
