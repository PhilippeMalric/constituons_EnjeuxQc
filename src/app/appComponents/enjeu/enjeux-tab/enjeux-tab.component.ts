import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../../../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-enjeux-tab',
  templateUrl: './enjeux-tab.component.html',
  styleUrls: ['./enjeux-tab.component.css']
})
export class EnjeuxTabComponent implements OnInit {

 
  enjeux: any;
  displayedColumns = ['titre', 'description', 'badges'];
  dataSource = new EnjeuDataSource(this.api);
  cols:Number = 3
  



  constructor(private api: ApiService) { }

  addLike(e){
    let id = e._id
    if(e.likeColor == "accent" ){
      console.log("Like added")
      e.likeColor = "warn"
      e.like += 1
      this.api.addLikeToEnjeux(id).subscribe(res => {
      },
        err => {
      console.log(err);
    });
    }
    else{
      e.likeColor = "accent"
      e.like -= 1
      this.api.remLikeToEnjeux(id).subscribe(res => {
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
        this.api.addDontLikeToEnjeux(id).subscribe(res => { },
          err => {
        console.log(err);
      });
      }
      else{
        e.dontLikeColor = "accent"
        e.dontLike -= 1
        this.api.remDontLikeToEnjeux(id).subscribe(res => { },
          err => {
        console.log(err);
        });
      }
      
    
}
  

  ngOnInit() {
    if (window.screen.width < 780 && window.screen.width > 600) { // 768px portrait
      this.cols = 2;
    }
    else{
      if(window.screen.width < 600){
        this.cols = 1;
      }

    }
    this.api.getEnjeux()
      .subscribe(res => {
        console.log(res);
       
        for(let e of res){
          e.likeColor = "accent"
          e.dontLikeColor = "accent"
        }
        this.enjeux = res;
      }, err => {
        console.log(err);
      });
  }

  onResize(event) {
    console.log("resize width : ",window.screen.width)

    if(window.screen.width > 780){
      this.cols = 3;
    }
    if (window.screen.width < 780 && window.screen.width > 600) { // 768px portrait
      this.cols = 2;
    }
    else{
      if(window.screen.width < 600){
        this.cols = 1;
      }

    }
  }


}

export class EnjeuDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getEnjeux();
  }

  disconnect() {

  }
}
