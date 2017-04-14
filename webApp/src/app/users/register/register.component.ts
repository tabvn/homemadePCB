import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {AngularFire, AngularFireAuth} from 'angularfire2';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    message: string;
    user: User = new User();

    constructor(private af: AngularFire, private dialogRef: MdDialogRef<RegisterComponent>) {


        this.af.auth.subscribe(auth => {

            if (auth) {

                this.dialogRef.close();
                const userId = auth.uid;
                const user = this.af.database.object('/users/' + userId);
                const data = this.user;
                data.id = auth.uid;
                delete data.password;
                delete data.passwordConfirm;

                user.set(data).then(_ => {
                    auth.auth.updateProfile({displayName: data.firstName, photoURL: null});
                }).catch(err => {

                });
            }

        });

    }

    ngOnInit() {


    }


    checkError(): boolean {

        if (!this.user.email || !this.user.password || !this.user.firstName || !this.user.lastName) {
            return false;
        }
        if (this.user.passwordConfirm !== this.user.password) {
            return false;
        }

        return true;
    }

    onSubmit() {


        if (this.checkError()) {
            const data = {
                email: this.user.email,
                password: this.user.password
            };

            this.af.auth.createUser(data).catch(err => {

                this.message = err.message;
            });
        } else {

            this.message = 'Form is not valid';
        }

    }
}
