import React, { Component } from 'react'
import { Redirect } from "react-router-dom";

export default class MessageBoard extends Component {

  constructor(props) {
    super(props)

    this.state = {
        msg: this.props.location.state.msg
    }

  }


  render() {
    if(this.state.msg) {

    return (
      <div className="login d-flex">
            <h1 className="mt-2 mb-3"> {this.state.msg} </h1>
      </div>
    );

} else {
    return (
        <h1 className="mt-2 mb-3"> Ann error occured. Try again later! </h1>
    )
}
  }
}
