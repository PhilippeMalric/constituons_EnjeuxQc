import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-categorie',
  templateUrl: './choose-categorie.component.html',
  styleUrls: ['./choose-categorie.component.css']
})
export class ChooseCategorieComponent implements OnInit {

  productListSource = [
                        {viewValue:"La démocratie",state:false},
                        {viewValue:"La santé",state:false},
                        {viewValue:"L'éducation",state:false},
                        {viewValue:"L'écart des richesses",state:false},
                        {viewValue:"L'alimentation",state:false},
                        {viewValue:"Les besoins de bases",state:false},
                        {viewValue:"La justice",state:false},
                        {viewValue:"Les impots",state:false},
                        {viewValue:"L'économie",state:false},
                        {viewValue:"La planette",state:false},
                        {viewValue:"Autres",state:false}
                      ]

  @Output() categorieEvent = new EventEmitter<any[]>();

  selectedChips: any[] = [];


  constructor() { }

  ngOnInit() {
  }


  

  changeSelected(parameter: string, query: string) {

    let index = this.selectedChips.indexOf(query);
    if (index >= 0) {
        this.selectedChips.splice(index, 1);
    } else {
        this.selectedChips.push(query);
    }

    console.log("this. selectedChips " + this.selectedChips  );

  }
  done = () => {
    this.categorieEvent.emit(this.selectedChips)
  }
  

}
