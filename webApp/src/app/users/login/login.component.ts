import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {AngularFire} from 'angularfire2';
import {MdDialogRef, MdDialog} from '@angular/material';
import {RegisterComponent} from '../register/register.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    user: User = new User();
    message: string;
    submitted = false;

    constructor(private dialogRef: MdDialogRef<LoginComponent>,
                private af: AngularFire, private dialog: MdDialog) {

        this.af.auth.subscribe(auth => {

            if (auth) {
                this.dialogRef.close();
            }
        });
    }

    ngOnInit() {

    }


    onLogin() {

        this.submitted = true;
        this.message = null;

        if (!this.user.email || !this.user.password) {

            this.message = 'Email and password are required!';

            this.submitted = false;
            return;
        }

        const data = {
            email: this.user.email,
            password: this.user.password
        };
        this.af.auth.login(data).catch(err => {
            this.submitted = false;
            this.message = err.message;
        });
    }


    register() {

        this.dialogRef.close();

        this.dialog.open(RegisterComponent, {
            width: '400px'
        });

    }
}
