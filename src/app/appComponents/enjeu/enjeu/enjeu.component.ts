import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ApiService } from '../../../api.service';
import { DataSource } from '@angular/cdk/collections';
import { DataService } from 'src/app/sharedServices';
import {FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-enjeu',
  templateUrl: './enjeu.component.html',
  styleUrls: ['./enjeu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EnjeuComponent implements OnInit {

  catsChosens: string[] = [] 

  enjeux: any = [];
  enjeuxG: any = [];
  displayedColumns = ['titre', 'description', 'badges'];
  dataSource = new EnjeuDataSource(this.api);
  cols:Number = 3
  cat = new FormControl();
  catList: string[] = [];


  constructor(private router: Router, private route: ActivatedRoute,private api: ApiService, public dataService: DataService) { }

  ngAfterViewInit(){
    console.log("ngAfterViewInit()")
  }

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
       let catD = {}
        for(let e of res){
          e.likeColor = "accent"
          e.dontLikeColor = "accent"
          e.checked = false
          for (let s of e.categories){
            catD[s]=1
          }          
        }
        this.catList = Object.keys(catD)
        this.enjeuxG = res;
        if(this.catsChosens.length > 0){
          
          for (let enj of res){
            for (let ca of enj.categories){
              for (let catChosen in this.catsChosens){
                if(ca == catChosen){
                  this.enjeux.push(enj);
                }
              }
            }
          }
        }
        else{
          this.enjeux = res;
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


  changeEnjeux(){

    console.log("this.cat",this.cat)
    let st = "";
      this.catsChosens = []
      for(let s of this.cat.value){

        this.catsChosens.push( s.replace("_"," ").replace("é","e").replace("'","_"))

    }
    if(this.catsChosens.length > 0){
          
      for (let enj of this.enjeuxG){
        for (let ca of enj.categories){
          for (let catChosen in this.catsChosens){
            if(ca == catChosen){
              this.enjeux.push(enj);
            }
          }
        }
      }
    }
    else{
      this.enjeux = this.enjeuxG;
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
