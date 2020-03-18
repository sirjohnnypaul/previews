import React, { Component } from 'react'

export default class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
        email: '',
        emailMSG: '',
        password: '',
        passwordMSG: '',
        name: '',
        nameMSG: '',
        surname: '',
        surnameMSG: '',
        phone: '',
        phoneMSG: '',
        address: '',
        addressMSG: '',
        city: '',
        cityMSG: '',
        post: '',
        postMSG: '',
        country: '',
        countryMSG: '',
        registrationError: ''
    }

  }

   handleEmailRegister(event) {
    this.setState({
      email: event.target.value
    });
  };

  handlePasswordRegister(event) {
    this.setState({
      password: event.target.value
    });
  };

  handleName(event) {
    this.setState({
      name: event.target.value
    });
  };

  handleSurname(event) {
    this.setState({
      surname: event.target.value
    });
  };

  handleAddress(event) {
    this.setState({
      address: event.target.value
    });
  };

  handlePhone(event) {
    event.preventDefault();
    this.setState({
      phone: event.target.value
    });
  };

  handleCity(event){
    this.setState({
      city: event.target.value
    });
  };

  handlePost(event) {
    this.setState({
      post: event.target.value
    });
  };

  handleCountry(event) {
    this.setState({
      country: event.target.value
    });
  };

  handleRegister(event) {
    event.preventDefault();
    console.log(this.state.email);

    let fieldEmpty = "Please fill the field first";

    if(this.state.address !== '') {
      this.setState({ addressMSG: ''})
    } else {
      this.setState({ addressMSG: fieldEmpty})
    }

    if(this.state.city !== '') {
      this.setState({ cityMSG: ''})
    } else {
      this.setState({ cityMSG: fieldEmpty})
    }

    if(this.state.country !== '') {
      this.setState({ countryMSG: ''})
    } else {
      this.setState({ countryMSG: fieldEmpty})
    }

    if(this.state.email !== '') {
      this.setState({ emailMSG: ''})
    } else {
      this.setState({ emailMSG: fieldEmpty})
    }

    if(this.state.name !== '') {
      this.setState({ nameMSG: ''})
    } else {
      this.setState({ nameMSG: fieldEmpty})
    }

    if(this.state.surname !== '') {
      this.setState({ surnameMSG: ''})
    } else {
      this.setState({ surnameMSG: fieldEmpty})
    }

    if(this.state.password !== '') {
      this.setState({ passwordMSG: ''})
    } else {
      this.setState({ passwordMSG: fieldEmpty})
    }

    if(this.state.post !== '') {
      this.setState({ postMSG: ''})
    } else {
      this.setState({ postMSG: fieldEmpty})
    }

    if(this.state.phone !== '') {
      this.setState({ phoneMSG: ''})
    } else {
      this.setState({ phoneMSG: fieldEmpty})
    }


    let user = {
      name: this.state.name,
      surname: this.state.surname,
      email:this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      city: this.state.city,
      postCode: this.state.post,
      country: this.state.country,
      password: this.state.password,
      accountType: "user"
    }

    fetch('104.248.24.223:2530/users/', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if(response.status != 200) {
        console.log("Error");
        response.json().then((responseData) => {
          console.log('Error data:',responseData);
          this.setState({
            registrationError: responseData
          });
        });
      } else {
        console.log("Success");
        
          this.props.history.push({
            pathname: '/'
          })
      }
    })
  };


  render() {

    let nameMessage;
    let surnameMessage;
    let emailMessage;
    let phoneMessage;
    let addressMessage;
    let cityMessage;
    let postMessage;
    let countryMessage;
    let passwordMessage;
    let registerError;

    if(this.state.registrationError !== ''){
      registerError = <p className="messageRegister">{this.state.registrationError}</p>
    } else {
      registerError = '';
    }

    if(this.state.nameMSG !== '') {
      nameMessage = <p className="messageRegisterField">{this.state.nameMSG}</p>
    } else {
      nameMessage = ''
    }

    if(this.state.surnameMSG !== '') {
      surnameMessage = <p className="messageRegisterField">{this.state.surnameMSG}</p>
    } else {
      surnameMessage = ''
    }

    if(this.state.emailMSG !== '') {
      emailMessage = <p className="messageRegisterField">{this.state.emailMSG}</p>
    } else {
      emailMessage = ''
    }

    if(this.state.phoneMSG !== '') {
      phoneMessage = <p className="messageRegisterField">{this.state.phoneMSG}</p>
    } else {
      phoneMessage = ''
    }

    if(this.state.addressMSG !== '') {
      addressMessage = <p className="messageRegisterField">{this.state.addressMSG}</p>
    } else {
      addressMessage = ''
    }

    if(this.state.cityMSG !== '') {
      cityMessage = <p className="messageRegisterField">{this.state.cityMSG}</p>
    } else {
      cityMessage = ''
    }

    if(this.state.postMSG !== '') {
      postMessage = <p className="messageRegisterField">{this.state.postMSG}</p>
    } else {
      postMessage = ''
    }

    if(this.state.countryMSG !== '') {
      countryMessage = <p className="messageRegisterField">{this.state.countryMSG}</p>
    } else {
      countryMessage = ''
    }

    if(this.state.passwordMSG !== '') {
      passwordMessage = <p className="messageRegisterField">{this.state.passwordMSG}</p>
    } else {
      passwordMessage = ''
    }

    return (
      <div className="login d-flex">
          <section className="login-left">
            <h1 className="mt-2 mb-3"> Welcome in Xprint </h1>
            <h2>
              We will print and deliver your printings directly to your door
            </h2>
          </section>
          <section className="register-right">
                    <div className="registerForm">
                      <p className="login-title pt-3">Register Here </p>
                      <form className="mb-3 formRegister" onSubmit={this.handleRegister.bind(this)}>

                        <input id="4" className="mb-2"
                        type="text"
                        placeholder="Name"
                        onChange={this.handleName.bind(this)}
                        />
                        {nameMessage}

                        <input id="5" className="mb-2"
                        type="text"
                        placeholder="Surname"
                        onChange={this.handleSurname.bind(this)}
                        />
                        {surnameMessage}

                        <input id="6" className="mb-2"
                          type="text"
                          placeholder="Email"
                          onChange={this.handleEmailRegister.bind(this)}
                        />
                        {emailMessage}

                        <input className="mb-2"
                          type="text"
                          placeholder="Phone"
                          onChange={this.handlePhone.bind(this)}
                        />
                        {phoneMessage}

                        <input className="mb-2"
                        type="text"
                        placeholder="Address"
                        onChange={this.handleAddress.bind(this)}
                        />
                        {addressMessage}

                        <input className="mb-2"
                        type="text"
                        placeholder="City"
                        onChange={this.handleCity.bind(this)}
                        />
                        {cityMessage}

                        <input className="mb-2"
                        type="text"
                        placeholder="Post Code"
                        onChange={this.handlePost.bind(this)}
                        />
                        {postMessage}

                        <input className="mb-2"
                        type="text"
                        placeholder="Country"
                        onChange={this.handleCountry.bind(this)}
                        />
                        {countryMessage}

                        <input className="mb-2"
                          type="password"
                          placeholder="Password"
                          onChange={this.handlePasswordRegister.bind(this)}
                        />
                        {passwordMessage}

                        <input type="submit" value="Register" />
                        {registerError}
                      </form>
                      
                      <p className="register-title pt-2 pb-2">
                        Already have account? Login here!
                      </p>

                      <a href="/" className="register-button mb-4" > Login </a>

                    </div>
                  </section>
      </div>
    );
  }
}
