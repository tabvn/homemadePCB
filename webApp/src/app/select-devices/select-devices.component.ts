import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';
import {AppService} from '../app.service';

@Component({
    selector: 'app-select-devices',
    templateUrl: './select-devices.component.html',
    styleUrls: ['./select-devices.component.scss']
})
export class SelectDevicesComponent implements OnInit {

    devices: any[] = [];
    public selected: any;

    constructor(public app: AppService, public dialog: MdDialogRef<SelectDevicesComponent>) {


    }


    ngOnInit() {

        this.app.devices.subscribe(data => this.devices = data);

    }

    save() {

        console.log(this.selected);

        let data: any[] = [];
        let keys: string[] = Object.keys(this.selected);

        if (keys && keys.length) {
            for (let i = 0; i < keys.length; i++) {
                let selected = this.selected[keys[i]];

                if (selected) {
                    let id = keys[i];
                    let device = this.getDeviceById(id);

                    if (device) {
                        let deviceItem = {
                            title: device.title,
                            state: false,
                            id: id
                        };

                        data.push(deviceItem);
                    }

                }


            }
        }

        this.dialog.close(data);
    }

    getDeviceById(id: any) {


        if (this.devices && this.devices.length) {
            for (let i = 0; i < this.devices.length; i++) {
                if (this.devices[i].$key === id) {
                    return this.devices[i];
                }
            }
        }
        return null;
    }


}
