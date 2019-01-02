import { Component, OnInit } from '@angular/core';
import { DataService } from '../sharedServices';
import { AuthenticationService, UserDetails } from '../service/authentication.service';
import { ApiService } from '../api.service';
import { MatRadioChange } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

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
  constructor(private sanitizer: DomSanitizer, private api: ApiService, private auth: AuthenticationService, public dataService: DataService) { }


  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.getUserEdts()
    }
  }

getUserEdts(){
  this.api.getUser(this.auth.getUserDetails()._id)
    .subscribe(res => {
      console.log("espaceDeTravail res after created : ",+res);
      this.espaces = res.edts
      this.espacesName = res.edts.map(x=>x.nom);
        
      }, (err) => {
        console.log(err);
      });
}


  onLogin(event){
    console.log("User details : ",this.auth.getUserDetails())
    this.getUserEdts()
  }

}
