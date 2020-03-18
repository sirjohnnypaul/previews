import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
export default class paymentSuccesfull extends Component {

  constructor(props) {
    super(props)

    this.state = {
        msg: 'Your payment has been succesfully registered. Your printing is awaiting its turn in pritning stack'
    }

  }


  handleLogin(event) {

  };


  render() {
    let message;
    if(this.state.msg != '') {
      message = <p className="messageLoginSuccess">{this.state.msg}</p>
    } else {
      message = ''
    }
    return (
      <div className="text-center m-auto col-8 pt-5">
          <h2>{message}</h2>
          <a className="register-button mb-4 mt-4 " href="/">Login Again</a>
      </div>
    );
  }
}
