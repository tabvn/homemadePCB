import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {AngularFire, AngularFireAuth, FirebaseAuthState, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class AppService {

    title = 'Home';
    $title: Subject<string> = new Subject<string>();
    public auth: FirebaseAuthState;


    public devices: FirebaseListObservable<any[]>;
    public automation: FirebaseListObservable<any[]>;

    constructor(public fb: AngularFire) {
        this.$title.subscribe(title => this.title = title);


        this.fb.auth.subscribe(auth => {
            this.auth = auth;
            this.devices = this.fb.database.list('/app/devices');
            this.automation = this.fb.database.list('/app/tasks');

        });
    }

    setTitle(title: string) {
        this.$title.next(title);
    }

    getTitle(): string {
        this.$title.subscribe(title => {
            this.title = title;
            return title;
        });
        return this.title;
    }

    signOut() {
        this.fb.auth.logout();
    }

}
