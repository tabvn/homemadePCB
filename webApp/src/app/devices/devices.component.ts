import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {


    constructor(public app: AppService) {

    }

    ngOnInit() {


    }

    deviceStateChange(e: any, device: any) {
        device.state = e.checked;
        this.app.devices.update(device.$key, device);
    }

}
