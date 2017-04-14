import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
    selector: 'app-edit-device',
    templateUrl: './edit-device.component.html',
    styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent implements OnInit {
    device: any;

    constructor(public dialog: MdDialogRef<EditDeviceComponent>) {

    }

    ngOnInit() {

    }

    onSave() {

        console.log(this.device);

        if (this.device.title) {

            this.dialog.close(this.device);
        }
    }

}
