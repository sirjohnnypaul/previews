import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {LoginDialogComponent} from '../dialogs/login-dialog/login-dialog.component';
import {RegistrationDialogComponent} from '../dialogs/registration-dialog/registration-dialog.component';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/products']);
    }
  }

  onLoginDialogOpen(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialog.open(LoginDialogComponent, dialogConfig);

  }

  onRegistrationDialogOpen(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialog.open(RegistrationDialogComponent, dialogConfig);
  }

}
