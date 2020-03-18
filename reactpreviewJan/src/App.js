import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Order from "./components/order";
import Panel from "./components/Panel";
import OrderNew from "./components/OrderNew";
import Profile from "./components/Profile";
import MessageBoard from "./components/MessageBoard";
import paymentSuccesfull from "./components/paymentSuccesfull";
import paymentFailed from "./components/paymentFailed";
import { Redirect, Route, BrowserRouter } from "react-router-dom";


class App extends Component {


  render() {
    return (
      <div>
          <Navbar/>
              <div>
                <BrowserRouter>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/ordernew" component={OrderNew} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/panel" component={Panel} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path='/paymentSuccesfull' component={paymentSuccesfull} />
                  <Route exact path='/paymentFailed' component={paymentFailed} />
                  <Route exact path="/registrationSuccesfull" component={MessageBoard} />
                </BrowserRouter>
              </div>
        }
        </div>
    );
  }
}

export default App;
