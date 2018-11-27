import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-opinions-tab',
  templateUrl: './opinions-tab.component.html',
  styleUrls: ['./opinions-tab.component.css']
})
export class OpinionsTabComponent implements OnInit {

  
  @Input() enjeuId:string;

  @Input() opinions: any[];

  displayedColumns = ['title', 'description', 'author'];
  dataSource = new OpinionDataSource(this.api);

  cols = 4

  constructor(private api: ApiService) { }

  ngOnInit() {
    if (window.screen.width < 400) { // 768px portrait
      this.cols = 1;
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
