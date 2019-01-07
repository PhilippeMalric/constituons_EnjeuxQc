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
  enjeuxTabs: any = {}
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
    let res = this.dataService.espace.enjeux

    if(res.length > 10){
      res = res.slice(0, 10)
    }
    console.log(res);
    let catD = {}
    for(let e of res){
      e.likeColor = "accent"
      e.dontLikeColor = "accent"
      e.checked = false
      for (let s of e.categories){
        catD[s.replace("_"," ").replace("é","e").replace("'","_")]=1
      }          
    }
    this.catList = Object.keys(catD)
    
    this.enjeuxG = res;
    this.enjeux = res;
    for (let enj of res){
      console.log("enj : ",enj)
      for (let ca of enj.categories){
        ca = ca.replace("_"," ").replace("é","e").replace("'","_")
        for (let catChosen of this.catList){
          if(ca == catChosen){
            console.log("--enj : ",enj)
            if(ca  in this.enjeuxTabs){
              this.enjeuxTabs[ca].push(enj);
            }
            else{
              this.enjeuxTabs[ca] = [enj];
            }
          }
        }
      }
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


  changeEnjeux(){

    console.log("this.cat : ",this.cat)
    let st = "";
    this.catsChosens = []
    for(let s of this.cat.value){

      this.catsChosens.push( s.replace("_"," ").replace("é","e").replace("'","_"))

    }
    if(this.catsChosens.length > 0){
      let enjD = {}
      console.log("this.catsChosens : ",this.catsChosens)
      console.log("this.enjeuxTabs : ",this.enjeuxTabs)
      for(let cat of this.catsChosens){
        for (let e of this.enjeuxTabs[cat]){
          enjD[e.titre] = e
        }
        
      }
      this.enjeux = Object.values(enjD)  ;
      
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
