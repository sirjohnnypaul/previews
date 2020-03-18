import {UserNewModel} from '../models/userNew.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from '../models/user.model';

@Injectable()
export class AuthService {
  private serverResponse: string = undefined;

  constructor(private httpClient: HttpClient, private router: Router) {}

  createUser(user: UserNewModel) {
    const dataParams = {
      username: user.username,
      email: user.email,
      password: user.password
    };
    return this.httpClient.post('http://localhost:8000/new-user/', dataParams).subscribe(
      (response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    );
  }

  loginUser(username: string, password: number) {
    const dataParams = {
      username: username,
      password: password
    };
    return this.httpClient.post<{'token': string}>('http://localhost:8000/api-token-auth/', dataParams);
  }

  setToken(token: string) {
    localStorage.setItem('userToken', token);
  }

  getToken() {
    return localStorage.getItem('userToken');
  }

  isAuthenticated() {
    if (this.getToken() != null) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }

  logout() {
  localStorage.removeItem('userToken');
    this.router.navigate(['/home']);
  }

  /*
  * Subscription substitute
  */
  setServerResponse(messageData: string) {
    this.serverResponse = messageData;
  }

  getServerResponse() {
    console.log('getServerResponse CALLED');
    return this.serverResponse;
  }
}
