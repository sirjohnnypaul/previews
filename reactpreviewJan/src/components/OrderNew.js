import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import Select from 'react-select';
import Axios from 'axios';
import Dropzone from './Dropzone';
import Progress from "./Progress";
import "react-datepicker/dist/react-datepicker.css";
import { pdfjs } from 'react-pdf';
const crypto = require("crypto");
const pdfjsLib = require('pdfjs-dist');
const path = require('path');
const md5 = require('blueimp-md5');
const cryptoString = require('crypto-random-string');

export default class OrderNew extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        user: this.props.location.state.userId,
        fileName: '',
        file: '',
        deliveryDate: new Date(),
        fileUploaded: false,
        name: '',
        message: '',
        payment: 'select',
        deliveryType:'',
        printingoption : '',
        selectedFile: null,
        loaded: 0,
        uploading: false,
        uploadProgress: {},
        successfullUploaded: false,
        todaysDate: new Date(),
        files: [],
        filesAcceptedCount: 0,
        filesSentToUpload: 0,
        uploading: false,
        uploadProgress: {},
        successfullUploaded: false,
        uploadedFilesIDs: [],
        uploadFilesFailed: false,
        notPDFAdded: false,
        blockNext: true,
        orderPagesToPrint: 0,
        price: 0,
      }

      this.onFilesAdded = this.onFilesAdded.bind(this);
      this.uploadFiles = this.uploadFiles.bind(this);
      this.sendRequest = this.sendRequest.bind(this);
      this.renderActions = this.renderActions.bind(this);

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
              user: responseData
            })
          })
        }
      });
    }


  onFilesAdded(files) {
    let filesAccepted = [];
    let countAccepted = 0;
    let countSent = 0;
      for(let i=0; i<files.length; i++) {
        countSent +=1;
        let file = files[i];
        console.log(path.extname(file.name));
        if(path.extname(file.name) != ".pdf") {
          this.setState({
            notPDFAdded: true
          });
        } else {
          filesAccepted.push(file);
          countAccepted +=1
        }
      };

      this.setState(prevState => ({
        files: prevState.files.concat(filesAccepted),
        filesAcceptedCount: countAccepted,
        filesSentToUpload: countSent
      }));
      console.log(this.state.files)
  }
  
  async priceChanged(price) {
    await this.setState({
      price: price.target.value
    });
  }

  async uploadFiles() {
    await this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    await this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      await this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      await this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      const randomGen = crypto.randomBytes(20).toString('hex');
      const fileNameGenerated = randomGen+file.name
      console.log(fileNameGenerated);
      formData.append("data", file);
      formData.append("label","uploaded");
      formData.append("fileNameExtra",fileNameGenerated)

      fetch("104.248.24.223:2530/orders/files", {
        method: 'post',
        body: formData,
        headers: {
          'Authorization': ''
        }}).then((response) => {
          if(response.status == 200) {
          response.json().then((responseData) => {
            console.log(responseData);
            let arrayUpdated = this.state.uploadedFilesIDs;
            arrayUpdated.push(responseData.file._id);
            let pagesToPrint = this.state.orderPagesToPrint += responseData.pages;
            this.setState({
              uploadedFilesIDs: arrayUpdated,
              blockNext: false,
              orderPagesToPrint: pagesToPrint
            })
            console.log(this.state.uploadedFilesIDs);
          });
        } else {
          this.setState({
            uploadFilesFailed: true
          })
        }
        })
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullUploaded: false })
          }
        >
          Wyczyść
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Załaduj plik
        </button>
      );
    }
  }
    
  async handleChangDelivery(delivery) {
    await this.setState({
      deliveryType: delivery.target.value
    });
    await console.log(this.state.deliveryType);
  }

  async handleChangeDate(date) {
    await this.setState({
        todaysDate: date
    });
    await console.log(this.state.todaysDate);
  }

  async handleChangeMsg(msg) {
    await this.setState({
        message: msg.target.value
    });
    await console.log(this.state.message);
  }

  async handleChangeOption(option) {
    await this.setState({
        printingoption: option.target.value
    });
    await console.log(this.state.printingoption);
  }

  
  async handleChangePayment(type) {
    await this.setState({
      payment: type.target.value
    })
    await console.log(this.state.payment);
  };

  async onFileAdded(files) {
    await this.setState({
      selectedFile: files.target.files[0],
      loaded: 0
    });
    const data = await new FormData();
    await data.append('file', this.state.selectedFile,this.state.selectedFile.name);

    await fetch('104.248.24.223:2530/orders/uploadFile', {
      method: 'POST',
      body: data,
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json'
      }
    })
    await console.log(this.state.selectedFile);
  };

checkAndSend(){
    // const data = new FormData();
    // data.append('file', this.state.selectedFile,this.state.selectedFile.name);

    let veryId =  cryptoString({length: 20, type: 'url-safe'});
    let newOrder = {
      file: '',
      status: "pendingPayment",
      dateCreated: new Date().toDateString(),
      deliveryDate: this.state.todaysDate.toDateString(),
      delivery: this.state.deliveryType,
      price: this.state.price,
      type: this.state.printingoption,
      description: this.state.message,
      orderFiles:this.state.uploadedFilesIDs,
      user: this.state.user,
      pagesToPrint: this.state.orderPagesToPrint,
      veryficationId: veryId
    };

    console.log(newOrder);

    fetch('104.248.24.223:2530/orders', {
      method: 'post',
      body: JSON.stringify(newOrder),
      headers: {
        'Authorization': '',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if(response.status != 200) {
        console.log("Error");
        this.setState({
          orderPagesToPrint: 0
          //set order_id
        })
      } else {
        console.log("Success");
        //console.log("Succes return",response.json());
        response.json().then((responseData) => {
          console.log('Success Data:',responseData);
          this.setState({
            orderPagesToPrint: 0
          });
          const account_id = 36228;
          const amount = responseData.price;
          const description = `Payment ${responseData._id}`;
          const crc = responseData._id;
          const online = 1;
          const code = 'mWTfY3yOx6JGE5No';
          let hash = '';
          let stringToPass =[account_id,amount,crc,code]
          let joined = stringToPass.join('');
          hash = md5(joined);
          const url = `https://secure.tpay.com?id=${account_id}&amount=${amount}&description=${description}&md5sum=${hash}&crc=${crc}&online=${online}&result_url=104.248.24.223:2530/verify/paymentstatus&return_url=104.248.24.223:3000/paymentSuccesfull&return_error_url=104.248.24.223:3000/paymentFailed`;          
          console.log(url);
          window.location.replace(url);
        });
      }
    });
  }


  render() {
    let price;
    switch(this.state.printingoption){
      case 'black & white 1-side':
        price = this.state.orderPagesToPrint*0.1;
        break;
      case 'black & white 2-side':
        price = this.state.orderPagesToPrint*0.16;
        break;
      case 'color 1-side':
          price = this.state.orderPagesToPrint*1;
          break;
      case 'color 2-side':
          price = this.state.orderPagesToPrint*1.6;
          break;
      default:
          price = this.state.price; 
    }

    const fileInputRef = React.createRef();

    let uploadFilesFailedMsg;
    if(this.state.uploadFilesFailed == true) {
      uploadFilesFailedMsg = <p className="messageLogin">Ładowanie pliku się nie powiodło! Spróbuj ponownie</p>
    } else {
      uploadFilesFailedMsg = ''
    }

    let uploadStatusMSG;
    if(this.state.filesSentToUpload != 0) {
      if(this.state.notPDFAdded == true) {
        uploadStatusMSG = <p className="messageLogin">Tylko {this.state.filesAcceptedCount} plików zakceptowanych z {this.state.filesSentToUpload}. Pamiętaj! Możesz ładować jedynie pliki PDF. Kliknij żeby spróbować ponownie!</p>
      } else {
        uploadStatusMSG = <p className="messageLogin">{this.state.filesAcceptedCount} plików zakceptowanych z {this.state.filesSentToUpload}</p>
      }
    } else {
      uploadStatusMSG = <p className="messageLogin">Brak dodanych plików</p>
    }

    const printingOptions = [
      { label: "Black & White 2-side", value: 1 },
      { label: "Black & White 1-side", value: 2 },
      { label: "Color 2-side", value: 3 },
      { label: "Color 1-side", value: 4 },
      { label: "Picture, Graphics, Poster", value: 5 }
    ];

    return (
        <div className="order d-flex">
        <section className="order-left">
          <h1 className="mb-4"> Nowe zamówienie </h1>

          <div class="dataCollectSection">
          <p className="inputDescription">Wpisz tytuł druku lub wiadomość</p>
        <div class="input-group input-group-center pb-3 col-xs-11 col-md-10">
          <textarea onChange={this.handleChangeMsg.bind(this)} type="text" class="form-control bg-custom-input" placeholder="" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <p className="inputDescription">Wybierz opcję druku</p>

        <div className="pb-3 col-xs-11 col-md-10 m-auto">
        <select value={this.state.printingoption} onChange={this.handleChangeOption.bind(this)} className="form-control bg-custom-input col-xs-12 col-md-12">
          <option value="">Wybierz opcję</option>  
          <option value="black & white 1-side">Czarno/Biały 1-stronnie</option>
          <option value="black & white 2-side">Czarno/Biały 2-stronnie</option>
          <option value="color 1-side">Kolor 1-stronnie</option>
          <option value="color 2-side">Kolor 2-stronnie</option>
        </select>
        </div>

        <div className="Card pb-3 col-xs-11 col-md-10 m-auto">
        <div className="Upload">
        <p className="Title margin-auto text-center">Wybierz pliki do druku, a następnie kliknij przycisk "Potwierdź"</p>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
        {uploadFilesFailedMsg}
        {uploadStatusMSG}
      </div>
        </div>

        <p className="inputDescription">Wybierz rodzaj płatności</p>

        <div className="pb-3 col-xs-11 col-md-10 m-auto">
        <select value={this.state.payment} onChange={this.handleChangePayment.bind(this)} className="form-control bg-custom-input col-xs-12 col-md-12">
          <option value="">Wybierz rodzaj płatności</option>  
          <option value="card">Karta</option>
          <option value="bank transfer">Przelew</option>
        </select>
        </div>

        <p className="inputDescription">Wybierz formę odbioru</p>

    <div className="pb-3 col-xs-11 col-md-10 m-auto">
    <select value={this.state.deliveryType} onChange={this.handleChangDelivery.bind(this)} className="form-control bg-custom-input col-xs-12 col-md-12">
    <option value="">Wybierz formę odbioru</option>   
    <option value="Pickup in Printing Point">Odbiór w punkcie</option>
    </select>
    </div>
    
    <p className="inputDescription mt-3">Wybierz datę druku</p>

    <div class="input-group input-group-center col-12 p-none m-auto text-center">
    <DatePicker className="bg-custom-input datepicker p-2 ml-5"
    selected={this.state.todaysDate}
    onChange={this.handleChangeDate.bind(this)}/>
    </div>
    </div>
        </section>
        <section className="order-right">
        <div className="orderContent">
          <div className="order-data">
            <div className="orderElement">
              <p className="mr-2">Stron:</p>
              <span>{this.state.orderPagesToPrint}</span>
            </div>
            <div className="orderElement">
              <p className="mr-2"> Typ:</p>
              <span>{this.state.printingoption}</span>
            </div>
            <div className="orderElement">
              <p className="mr-2"> Dostawa: </p>
              <span>{this.state.deliveryType}</span>
            </div>
            <div className="order-price mt-2 pt-1 mb-2 pb-1">
              Cena: <span onChange={this.priceChanged.bind(this)}>{Math.round(price * 100) / 100} PLN</span>
            </div>

            <button disabled={this.state.blockNext} className="order-button mt-3" onClick={this.checkAndSend.bind(this)}>
              Zamów i zapłać
            </button>
          </div>
          </div>
        </section>
    </div>
    )
  }
}

