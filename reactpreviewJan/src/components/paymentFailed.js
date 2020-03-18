import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
export default class paymentFailed extends Component {

  constructor(props) {
    super(props)

    this.state = {
        msg: 'An error occured while processing your payment. Check your email for payment status and find a link to pay again or simply login to your accound and create the order again'
    }

  }


  handleLogin(event) {

  };


  render() {
    let message;
    if(this.state.msg != '') {
      message = <p className="messageLogin">{this.state.msg}</p>
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
