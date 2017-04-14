import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public app: AppService) { }

  ngOnInit() {

    this.app.setTitle('Home');

    console.log(this.app.getTitle());
  }

}
