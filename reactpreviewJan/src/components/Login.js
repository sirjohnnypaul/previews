import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
export default class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
        email: '',
        password: '',
        isLogged: false,
        msg: ''
    }

  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  };

  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  };

  handleLogin(event) {
    event.preventDefault();
    console.log("Actual", this.state.email);

    let user = {
      email: this.state.email,
      password: this.state.password
    }

    fetch('104.248.24.223:2530/users/login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Authorization': ' ',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if(response.status != 200) {
        console.log("Error");
        response.json().then((responseData) => {
          console.log('Error data:',responseData);
          this.setState({
            msg: responseData
          });
        });
      } else {
        console.log("Success");
        response.json().then((responseData) => {
          console.log('Success data', responseData);
          this.setState({
            isLogged: true
          });
          this.props.history.push({
            pathname: '/panel',
            state: { userId: responseData._id, isLogged: this.state.isLogged }
          })
        })
      } 
    })
  };


  render() {
    let message;
    if(this.state.msg != '') {
      message = <p className="messageLogin">{this.state.msg}</p>
    } else {
      message = ''
    }
    return (
      <div className="login d-flex">
          <section className="login-left">
            <h1 className="mt-2 mb-3"> Welcome in Xprint </h1>
            <h2>
              We will print and deliver your printings directly to your door
            </h2>
          </section>
          <section className="login-right">
          <div className="loginForm">
            <p className="login-title pt-3">Login</p>

            <form className="mb-3 formLogin" onSubmit={this.handleLogin.bind(this)}>

              <input id="1" className="mb-2"
                type="text"
                placeholder="Email"
                onChange={this.handleEmail.bind(this)}
              />
              
              <input id="2" className="mb-2"
                type="password"
                placeholder="Password"
                onChange={this.handlePassword.bind(this)}
              />

              <input id="3" type="submit" value="Login" />
              {message}
            </form>
            
            <p className="register-title pt-2 pb-2">
              Don't have account yet? Register here!
            </p>

            <a className="register-button mb-4 " href="/register"> Register </a>

          </div>
        </section>
      </div>
    );
  }
}
