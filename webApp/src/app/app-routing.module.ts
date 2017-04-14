import {NgModule}              from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './notfound/notfound.component';
import {SettingsComponent} from './settings/settings.component'
import {AutomationComponent} from './automation/automation.component';
const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'automation', component: AutomationComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}