import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.css']
})
export class OpinionComponent implements OnInit {

  @Input() enjeuId:string;

  @Input() opinions: any[];

  displayedColumns = ['title', 'description', 'author'];
  dataSource = new OpinionDataSource(this.api);

  cols = 3

  constructor(private api: ApiService) { }

  ngOnInit() {
    if (window.screen.width < 780 && window.screen.width > 600) { // 768px portrait
      this.cols = 2;
    }
    else{
      if(window.screen.width < 600){
        this.cols = 1;
      }

    }

if(this.enjeuId != ""){

    this.api.getOpinionsByEnjeux([this.enjeuId])
    .subscribe(res => {
      console.log(res);
     
      for(let e of res){
        e.likeColor = "accent"
        e.dontLikeColor = "accent"
      }
      this.opinions = res;
      for(let e of this.opinions){
        e.checked = false
      }
    }, err => {
      console.log(err);
    });
  }
  else{

    this.api.getOpinions()
    .subscribe(res => {
      console.log(res);
     
      for(let e of res){
        e.likeColor = "accent"
        e.dontLikeColor = "accent"
      }
      this.opinions = res;
      for(let e of this.opinions){
        e.checked = false
      }
    }, err => {
      console.log(err);
    });

  }
  }

  change(e:any){

    if(e.checked){
      e.checked=false;
    }
    else{
      e.checked=true;
    }

  }


  
  addLike(e){
    let id = e._id
    if(e.likeColor == "accent" ){
      console.log("Like added")
      e.likeColor = "warn"
      e.like += 1
      this.api.addLikeToOpinion(id).subscribe(res => {
      },
        err => {
      console.log(err);
    });
    }
    else{
      e.likeColor = "accent"
      e.like -= 1
      this.api.remLikeToOpinion(id).subscribe(res => {
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
      this.api.addDontLikeToOpinion(id).subscribe(res => { },
        err => {
      console.log(err);
    });
    }
    else{
      e.dontLikeColor = "accent"
      e.dontLike -= 1
      this.api.remDontLikeToOpinion(id).subscribe(res => { },
        err => {
      console.log(err);
      });
    }
  }
}
export class OpinionDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getOpinions();
  }

  disconnect() {

  }




}
