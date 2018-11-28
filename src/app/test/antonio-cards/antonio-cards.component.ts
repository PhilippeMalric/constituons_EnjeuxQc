import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-antonio-cards',
  templateUrl: './antonio-cards.component.html',
  styleUrls: ['./antonio-cards.component.css']
})
export class AntonioCardsComponent implements OnInit {

  cards:Number[] = [1,2,3,4,5,6,7,8]

  constructor() { }

  ngOnInit() {
  }

}
