import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { isThisSecond } from 'date-fns/esm';
import picture from "../images/1.jpg";


export default class Profile extends Component {
    render() {
        return (
            <div className="profile">
                <img src={picture}></img>
                <div className="profile-container">
                    <p className="profile-p">First name:</p><input type="text"></input><br />
                    <p className="profile-p">Last name:</p><input type="text"></input><br />
                    <p className="profile-p">E-mail address:</p><input type="text"></input><br />
                    <p className="profile-p">Home address:</p><input type="text"></input><br />
                    <button className="profile-btn-edit">Edit</button>
                    <button className="profile-btn-save">Save</button>
                </div>
            </div>
        );
    }
}