import { Component, OnInit } from '@angular/core';
import { DataService } from '../sharedServices';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  checked:Boolean

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

}
