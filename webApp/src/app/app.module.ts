import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {MaterialModule} from '@angular/material';
import 'hammerjs';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import {LoginComponent} from './users/login/login.component';
import {RegisterComponent} from './users/register/register.component';
import {DevicesComponent} from './devices/devices.component';
import {NavigationComponent} from './navigation/navigation.component';
import {PageNotFoundComponent} from './notfound/notfound.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {SettingsComponent} from './settings/settings.component';
import {AppService} from './app.service';
import { EditDeviceComponent } from './settings/edit-device/edit-device.component';
import { AutomationComponent } from './automation/automation.component';
import { SelectDevicesComponent } from './select-devices/select-devices.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


export const fbConfig = {
    apiKey: "AIzaSyCDqdgeSIhVYJs97ZZdgqpXCcmMlHoulSA",
    authDomain: "myhome-5d4ae.firebaseapp.com",
    databaseURL: "https://myhome-5d4ae.firebaseio.com",
    projectId: "myhome-5d4ae",
    storageBucket: "myhome-5d4ae.appspot.com",
    messagingSenderId: "561768036383"
};

const fbAuthConfig = {
    provider: AuthProviders.Google,
    method: AuthMethods.Password
};

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DevicesComponent,
        NavigationComponent,
        PageNotFoundComponent,
        HomeComponent,
        SettingsComponent,
        EditDeviceComponent,
        AutomationComponent,
        SelectDevicesComponent
    ],
    entryComponents: [LoginComponent, RegisterComponent, EditDeviceComponent, SelectDevicesComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        AngularFireModule.initializeApp(fbConfig, fbAuthConfig),
        AppRoutingModule
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
