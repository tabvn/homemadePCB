import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {AutomationTask} from '../models/automation-task';
import {MdDialog} from '@angular/material';
import {SelectDevicesComponent} from '../select-devices/select-devices.component';

@Component({
    selector: 'app-automation',
    templateUrl: './automation.component.html',
    styleUrls: ['./automation.component.scss']
})
export class AutomationComponent implements OnInit {


    showEdit: any[] = [];

    constructor(public dialog: MdDialog, public app: AppService) {


    }

    ngOnInit() {

        this.app.setTitle('Automation');

    }

    updateDeviceState(task: any, index: any, e) {
        this.app.fb.database.object('/app/tasks/' + task.$key + '/devices/' + index + '/state').set(e.checked);
    }

    update(task: any, index: number) {
        this.app.fb.database.object('/app/tasks/' + task.$key).set(task);
        this.showEdit[index] = false;
    }

    addTask() {

        const task = new AutomationTask();

        task.title = 'Do the job everyday at 6AM morning';
        task.value = '00 00 06 * * *';

        this.app.automation.push(task);
    }

    deleteTask(task: any) {
        this.app.fb.database.object('/app/tasks/' + task.$key).remove();
    }

    openSelectDevices(task: any) {
        let devices: any[] = task.devices ? task.devices : [];
        let ref = this.dialog.open(SelectDevicesComponent, {width: '400px'});

        let selected: any[] = [];
        if (devices && devices.length) {
            for (let i = 0; i < devices.length; i++) {
                selected[devices[i].id] = true;
            }
        }
        ref.componentInstance.selected = selected;

        ref.afterClosed().subscribe(data => {

            this.app.fb.database.object('/app/tasks/' + task.$key + '/devices').set(data);


        });
    }

    changeDeviceState(task: any, device: any, event) {
        device.state = event.checked;
        this.app.fb.database.object('/app/tasks/' + task.$key).set(task);
    }
}
