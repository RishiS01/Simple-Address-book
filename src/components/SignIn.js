import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.onSignIn = this.onSignIn.bind(this);
  }
  
  
  onSignIn() {
    console.log(this.props);
    const {signIn} = this.props;
    signIn()
  }

  render() {
    return (
      <div className="SignIn">
        <button
          onClick={this.onSignIn}
          className = "signInButton btn btn-block"
        >
          <i className="fa fa-google"></i>
              SignIn with Google
        </button>
      </div>
    );
  }
}

export default SignIn;
