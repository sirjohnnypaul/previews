import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserNewModel} from '../models/userNew.model';
import {AuthService} from './auth.service';
import {UserModel} from '../models/user.model';
import {ProductModel} from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private httpClient: HttpClient, private authService: AuthService) {
    }

    checkUsername(uNameData: string) {
        const dataParams = {
            username: uNameData
        };

        return this.httpClient.post<{ message: string }>('http://127.0.0.1:8000/check-username/', dataParams);
    }

    checkEmail(uEmail: string) {
        const dataParams = {
            email: uEmail
        };

        return this.httpClient.post<{ message: string }>('http://127.0.0.1:8000/check-email/', dataParams);
    }

    deleteUser() {
    }

    getUserData() {
        const token = this.authService.getToken();

        const httpHeaders = {
            headers: new HttpHeaders( {
                'Authorization': 'Token ' + token
            })
        };

        return this.httpClient.get<UserModel[]>('http://127.0.0.1:8000/api/user/', httpHeaders);
    }
}
