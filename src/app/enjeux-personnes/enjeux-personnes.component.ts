import { Component, OnInit } from '@angular/core';
import { DataService } from '../sharedServices';


@Component({
  selector: 'app-enjeux-personnes',
  templateUrl: './enjeux-personnes.component.html',
  styleUrls: ['./enjeux-personnes.component.css']
})


export class EnjeuxPersonnesComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

}
