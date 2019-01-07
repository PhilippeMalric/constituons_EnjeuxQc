import { Component, OnInit } from '@angular/core';
import { DataService } from '../sharedServices';
import { AuthenticationService, UserDetails } from '../service/authentication.service';
import { ApiService } from '../api.service';
import { MatRadioChange } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Personne } from '../class/Personne';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  checked:Boolean
  details: UserDetails;
  espaces: any;
  espacesName:any;
  downloadJsonHref:any;
  Name:string; 
  myFile:File; /* property of File type */

  options:any

  constructor(private sanitizer: DomSanitizer, private api: ApiService, private auth: AuthenticationService, public dataService: DataService) { }


  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.api.getPersonnes().subscribe((data:Personne[]) => {
        this.options = data.map((e:Personne)=>{return ""+e.nom})
      })
    }
  }
  ngOnchange(){
    console.log("ChangeDetected")
    if(this.auth.isLoggedIn()){
      this.api.getPersonnes().subscribe((data:Personne[]) => {
        this.options = data.map((e:Personne)=>{return ""+e.nom})
      })
    }
  }


  onLogin(event){
  }

}
