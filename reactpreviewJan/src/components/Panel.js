import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { isThisSecond } from 'date-fns/esm';

export default class Panel extends Component {

  constructor(props) {
    super(props)
    this.state = {
        id: this.props.location.state.userId,
        user: '',
        isLogged: this.props.location.state.isLogged,
        fetchingUserOrders: false,
        userOrders: []
    }

  }

  componentDidMount() {
    
    fetch('104.248.24.223:2530/users/'+this.state.id, {
      method: 'get',
      headers: {
        'Authorization': ''
      }
    }).then((response) => {
      console.log(response);
      if(response.status != 200) {
        console.log("Error");
        response.json().then((responseData) => {
          console.log(responseData);
        })
      } else {
        console.log("Success");
        response.json().then((responseData) => {
          console.log("Success data", responseData);
          this.setState({
            user: responseData,
            userOrders: responseData.userOrders
          })
        })
      }
    });

  }

  handleNewOrder() {
    this.props.history.push({
      pathname: '/ordernew',
      state: { userId: this.state.id, isLogged: this.state.isLogged }
    })
  }

  render() {
    let returnMsg;
    if(this.state.isLogged) 
        returnMsg = <div className="login d-flex"> <h1 className="mt-2 mb-3"> Witaj w Xprint {this.state.user.name} </h1></div>
    else 
        returnMsg = <Redirect to= {{ pathname: '/' }} />
  
    const { userOrders } = this.state;
    
    return (
      <div className="d-100">
        <div className="d-50">
          <p className="print-retail-label">Aktywne zamówienia</p>
          <div className="print-retail"> 
          {userOrders.map(element =>{
            return  <div key={element._id} className="print-pos">
            <p className="p-label"><b>Tytuł: {element.description}</b></p><hr />
            <p className="p-left-hor-nth-item">Data:</p> <p className="p-left-hor">{element.dateCreated}</p><br />
            <p className="p-left-hor-nth-item">Odbiór:</p> <p className="p-left-hor">{element.deliveryDate}</p>
            <p className="p-right-hor">Typ:</p> <p className="p-right-hor-nth-item">{element.delivery}</p><hr />
            
            <p className="p-progress">{element.status}</p>
          </div>;
          })} 

          </div><br /><hr />
          <p className="print-retail-label">Recent print orders</p>
          <div className="print-retail">
            <div className="print-pos">
              <p className="p-label"><b>Title: Print 1</b></p><hr />
              <p className="p-left-hor-nth-item">Ordered:</p> <p className="p-left-hor">21.06.2019</p><br />
              <p className="p-left-hor-nth-item">Pickup/Delivery:</p> <p className="p-left-hor">25.06.2019</p>
              <p className="p-right-hor">Address:</p> <p className="p-right-hor-nth-item">Bażyńskiego 2, Gdańsk</p><hr />
              <p className="p-progress">W trakcie...</p>
            </div>
    
          </div>
        </div>
        <div className="d-50">
          <div className="new-order-box">
            <p className="label">Chcesz złożyć nowe zamówienie?</p>
            <button className="new-order-btn" onClick={this.handleNewOrder.bind(this)} >Zamów teraz</button>
          </div>
        </div>
      </div>
    );
  }
}
