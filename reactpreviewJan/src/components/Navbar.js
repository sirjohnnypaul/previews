import React, { Component } from 'react'
import logo from '../assets/xprintlogo.png';

export default class Navbar extends Component {
  render() {

    return (
<nav class="navbar navbar-expand-lg navbar-light bg-navbar d-flex">
    <a class="navbar-brand navbar-font" href="/">
    <img src={logo} width="40" height="40" className="mr-1" alt=""/>
    xPRINT
    </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav ">
      <a class="nav-item nav-link active navbar-font" href="#">About <span class="sr-only">(current)</span></a>
    </div>
  </div>
</nav>
    )
  }
}
