import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthenticationService } from './service/authentication.service';

@Injectable() 
export class DataService {
  
  edT_nom : string = "Publique";
  edT = ""
  userData:any;
  espace:any;

  constructor(private api: ApiService,private auth: AuthenticationService) {
    console.log("call to DataService Constructor")
    if(auth.isLoggedIn){
      this.getUser();
    }
   }

   getUser(){
    this.auth.profile().subscribe(user => {
      console.log("user", user)
      console.log("this.edT : ",this.edT)
      this.userData = user
      if("edts" in user && user.edts.length > 0 && this.edT == ""){
        this.edT_nom = user.edts[0].nom
        this.edT = user.edts[0]._id
        this.espace = user.edts[0]
        console.log("user.edts[0]", user.edts[0])
      }     
    }, (err) => {
      console.error(err);
    });
  }
   

}