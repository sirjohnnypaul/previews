import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    userData: UserModel;
    receivedData: UserModel;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.setUserDataIntoFields();
    }

    setUserDataIntoFields(): void {
        this.userService.getUserData().subscribe(
            (response) => {
                console.log(response);
                this.userData = response[0];
            },
            (error) => {
                console.log(error);
            }
        );
    }

    // prepareDataToDisplay

}



