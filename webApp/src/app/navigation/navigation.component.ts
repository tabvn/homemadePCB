import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

    constructor(public app: AppService) {

    }

    ngOnInit() {
    }

}
