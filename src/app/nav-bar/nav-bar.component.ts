
import {ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation, Input, ViewChild, AfterViewInit} from '@angular/core';
import { AuthenticationService, UserDetails } from '../service/authentication.service';
import { environment } from "../../environments/environment"
import { MatBottomSheetRef, MatBottomSheet, MatRadioChange, MatRadioGroup, MatRadioButton } from '@angular/material';
import { ApiService } from '../api.service';
import { DataService } from '../sharedServices';
import { DomSanitizer } from '@angular/platform-browser';

/** @title Responsive sidenav */
@Component({
  selector: 'app-nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavBarComponent implements OnDestroy {
  
  devMode = !environment.production
  mode = 'push'
  opened = false;

  
  
  private _mobileQueryListener: () => void;

  constructor(public auth: AuthenticationService, private bottomSheet: MatBottomSheet, public dataService: DataService) {}

ngOnInit(){
  this.opened = true;
  setTimeout(() => {
    this.opened = false;
  }, 1000);
  if (window.screen.width < 600) { // 768px portrait
    this.mode = 'push';
    this.opened = false;
  }
  if(this.auth.isLoggedIn){
    this.dataService.getUser()
  }
}

clickMenu(){
  console.log("click")
  this.opened = false;
}

  ngOnDestroy(): void {
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
}


@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  styleUrls: ['nav-bar.component.scss'],
  templateUrl: 'bottom-sheet.html',
})

export class BottomSheetOverviewExampleSheet {

  @ViewChild('radioGroup') radioGroup: MatRadioGroup;

  details: UserDetails;
  espaces: any;
  espacesName:any;
  downloadJsonHref:any;
  Name:string; 
  myFile:File; /* property of File type */
  espaceChosen:string;

  constructor(
    public auth: AuthenticationService, 
    private sanitizer: DomSanitizer, 
    private api: ApiService, 
    public dataService: DataService, 
    private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>
    ) {
      console.log("User details : ",this.auth.getUserDetails())
      setTimeout(()=>{
        this.espaces = this.dataService.userData.edts
      },5000)
      
    }

  ngOnInit(){
    this.getSpaces()
  }

click(){
  this.dataService.getUser()
}

  getSpaces()
  {
    console.log("getspaces")
    console.log("this.dataService.userData.edts",this.dataService.userData.edts)
    console.log("this.dataService.edT_nom",this.dataService.edT_nom)
    this.espaces = this.dataService.userData.edts
    this.espacesName = []

    for(let espace of this.espaces){
      if(this.dataService.edT == ""){
        this.dataService.edT = espace._id
      }
      if(espace.nom == this.dataService.edT_nom){
        this.espacesName.push({nom:espace.nom,checked:true})
      }
      else{
        this.espacesName.push({nom:espace.nom,checked:false})
      }

    }
  }

  nameToId(name){
    for(let e of this.espaces){
      if(name == e.nom){
        return e._id;
      }
    }
    return false;
  }

  radioChange(event: MatRadioChange) {
    let nom = event.value.nom
    this.dataService.edT_nom = nom
    this.dataService.edT = this.nameToId(nom)
    let result=null
    for(let espace of this.dataService.userData.edts){
      if(espace.nom == nom){
        result = espace
      }
    }
    this.dataService.espace = result;
    console.log("getEspaceDeTravail : ",result);
    var theJSON = JSON.stringify(result);
    const blob = new Blob([theJSON], { type: 'application/octet-stream' });
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  fileChange($event: any){
    console.log("file : ",$event.files[0]);
    this.myFile= $event.files[0];
    this.onSubmit()
  }
  /* Now send your form using FormData */
  onSubmit(): void {
    this.myFile
    console.log("this.myFile : ",this.myFile)
    this.api.uploadFile(this.auth.getUserDetails()._id,this.myFile)
      .subscribe((data) => {
        this.auth.profile().subscribe(user => {
          this.dataService.userData = user 
          this.getSpaces()    
        }, (err) => {
          console.error(err);
        });
        
        console.log("data : ",data)
      });
  }

}