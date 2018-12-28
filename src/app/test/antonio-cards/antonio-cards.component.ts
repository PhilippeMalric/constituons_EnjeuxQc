import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-antonio-cards',
  templateUrl: './antonio-cards.component.html',
  styleUrls: ['./antonio-cards.component.css']
})
export class AntonioCardsComponent implements OnInit {

  cards:any[] = [{checked:false},{checked:false},{checked:false},{checked:false},{checked:false},{checked:false},{checked:false},{checked:false}]
  checked : boolean = true;
  constructor() { }

  ngOnInit() {
  }

  change(e:any){

    if(e.checked){
      e.checked=false;
    }
    else{
      e.checked=true;
    }

  }

}
