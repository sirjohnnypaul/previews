import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {UserNewModel} from '../../models/userNew.model';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent implements OnInit {
  public registrationForm: FormGroup;


  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6)],
        this.checkIfUsernameExist.bind(this)),
      'email': new FormControl(null, [Validators.required, Validators.email], this.checkIfEmailExist.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), this.checkPasswordPower]),
      'confPassword': new FormControl(null, [Validators.required, this.checkIfBothPasswordsAreEqual.bind(this)])
    });
  }

  onRegistration() {
    const userData: UserNewModel = this.registrationForm.value;

    console.log(this.registrationForm);
    // this.authService.createUser(userData);
  }

  /**
   * CUSTOM VALIDATORS
   */
  checkIfUsernameExist(usernameData: FormControl): Promise<any> | Observable<any> {
    const username = usernameData.value;

    const promise = new Promise<any>((resolve => {
      this.userService.checkUsername(username).subscribe(
        (response) => {
         if (response.message === 'exist') {
           resolve({'emailExist': true});
         } else {
           resolve(null);
         }
        }, (error) => {
          console.log(error);
        }
      );
    }));
    return promise;
  }

  checkIfEmailExist(emailData: FormControl): Promise<any> | Observable<any> {
    const email = emailData.value;

    const promise = new Promise<any>((resolve) => {
      this.userService.checkEmail(email).subscribe(
        (response) => {
          console.log(response);
          if (response.message === 'exist') {
            resolve({'usernameExist': true});
          } else {
            resolve(null);
          }
        }, (error) => {
          console.log(error);
        }
      );
    });

    return promise;
  }

  checkIfBothPasswordsAreEqual(passwordData: FormControl): {[k: string]: boolean} | null {
      const confPass = passwordData.value;

      if (this.registrationForm !== undefined) {
        const firstPass = this.registrationForm.value.password;

        if (confPass === firstPass) {
          return null;
        } else {
          return {'passwordsNotEqual': true};
        }
      }
  }

  checkPasswordPower(passwordData: FormControl): {[k: string]: boolean} | null {
    const pass: string = passwordData.value;
    let passArray = null;
    const pass_char = ['!', '@', '#', '$', '%', '&', '*', '/'];
    const pass_num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let containSpecial = false;
    let containNumber = false;

    if (pass !== null) {
      passArray = pass.split('');
      console.log(pass);
      console.log(passArray);

      passArray.forEach(function(char) {
        if (pass_char.indexOf(char) !== -1) {
          console.log('special char exist');
          containSpecial = true;
        }

        if (pass_num.indexOf(char) !== -1) {
          console.log('number exist');
          containNumber = true;
        }
      });
    }

    if ((containSpecial !== false) && (containNumber !== false)) {
      return null;
    } else {
      return {'leakPassword': true};
    }
  }
}
