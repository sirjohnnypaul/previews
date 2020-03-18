import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ProductModel} from '../../models/product.model';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLogin() {
    const uname = this.loginForm.value.username;
    const pass = this.loginForm.value.password;

    this.authService.loginUser(uname, pass).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/products']);
      }, (error) => {
        // Show Message on dialog about incorrect data
        console.log(error.statusText);
        console.log('Incorrect username or password');
      }
    );
  }
}
