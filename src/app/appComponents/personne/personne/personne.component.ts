import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css']
})
export class PersonneComponent implements OnInit {

  personnes: any;
  displayedColumns = ['id',  'slogan','photo'];
  dataSource = new PersonneDataSource(this.api);
  cols = 4;
  

  constructor(private api: ApiService) { }

  ngOnInit() {
    if (window.screen.width < 400) { // 768px portrait
      this.cols = 1;
    }

    this.api.getPersonnes()
      .subscribe(res => {
        console.log(res);
        this.personnes = res;
        for(let e of this.personnes){
          e.checked = false
        }
      }, err => {
        console.log(err);
      });
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

export class PersonneDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getPersonnes();
  }

  disconnect() {

  }

  addLike(e){
    let id = e._id
    if(e.likeColor == "accent" ){
      console.log("Like added")
      e.likeColor = "warn"
      e.like += 1
      this.api.addLikeToPersonne(id).subscribe(res => {
      },
        err => {
      console.log(err);
    });
    }
    else{
      e.likeColor = "accent"
      e.like -= 1
      this.api.remLikeToPersonne(id).subscribe(res => {
      },
        err => {
      console.log(err);
    });
    }
  }
  

  addDontLike(e){
    let id = e._id 
      if(e.dontLikeColor == "accent" ){
        e.dontLikeColor = "warn"
        e.dontLike += 1
        this.api.addDontLikeToPersonne(id).subscribe(res => { },
          err => {
        console.log(err);
      });
      }
      else{
        e.dontLikeColor = "accent"
        e.dontLike -= 1
        this.api.remDontLikeToPersonne(id).subscribe(res => { },
          err => {
        console.log(err);
        });
      }
      
    
}


}
