import {Component, OnInit} from '@angular/core';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {MdDialog} from '@angular/material';
import {LoginComponent} from './users/login/login.component';
import {AppService} from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    userId: string;

    constructor(public app: AppService, private dialog: MdDialog, private af: AngularFire) {

        this.af.auth.subscribe(auth => {

            this.userId = auth ? auth.uid : null;

            if (!auth) {
                this.dialog.open(LoginComponent, {
                    width: '400px',
                    disableClose: true
                });
            }

        });

    }

    ngOnInit() {

        this.app.setTitle('Home');
    }


    login() {
        this.dialog.open(LoginComponent, {
            width: '400px'
        });

    }

    logout() {

        this.af.auth.logout();
    }
}
