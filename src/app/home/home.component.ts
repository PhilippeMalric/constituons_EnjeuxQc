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

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.getUserEdts()
    }

  }

  onLogin(event){
    console.log("User details : ",this.auth.getUserDetails())
    this.getUserEdts()
  }

  radioChange(event: MatRadioChange) {
    this.dataService.edT = this.nameToId(event.value)
    this.dataService.edT_nom = event.value
}
  nameToId(name){
    for(let e of this.espaces){
      if(name == e.nom){
        return e._id;
      }
    }
    return false;
  }

  clickB(){
    console.log("User details : ",this.auth.getUserDetails())
    let id = this.dataService.edT
    console.log("id : ",id)
    if(id){
      this.api.getEspaceDeTravail(id)
      .subscribe(res => {
        console.log("getEspaceDeTravail : ",res);
        var theJSON = JSON.stringify(res);
        const blob = new Blob([theJSON], { type: 'application/octet-stream' });
        this.downloadJsonHref = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        }, (err) => {
          console.log(err);
        });
    }
    
  }
  fileChange($event: any){
    console.log($event.files);
    this.myFile= $event.files[0];
  }
  /* Now send your form using FormData */
onSubmit(): void {
  this.api.uploadFile(this.myFile)
    .subscribe((data) => console.log("data : ",data));
}

}
