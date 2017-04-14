import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {MdDialog} from '@angular/material';
import {EditDeviceComponent} from './edit-device/edit-device.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    constructor(public app: AppService, private dialog: MdDialog) {

    }

    ngOnInit() {
        this.app.setTitle('Settings');
    }

    edit(device: any) {

        const dialog = this.dialog.open(EditDeviceComponent, {width: '400px'});
        dialog.componentInstance.device = device;
        dialog.afterClosed().subscribe(data => {

            if (data) {
                this.app.fb.database.object('/app/devices/' + device.$key + '/title').set(data.title);

            }
        });

    }


}
