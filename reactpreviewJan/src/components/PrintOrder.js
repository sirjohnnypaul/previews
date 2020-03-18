import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { isThisSecond } from 'date-fns/esm';

export default class PrintOrder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            id: this.props.location.state.userId,
            user: '',
            isLogged: true
        }
    
      }
    render() {
        return (
            <div className="col-6 po-default">
                    Tasasd
            </div>
        );
    }
}