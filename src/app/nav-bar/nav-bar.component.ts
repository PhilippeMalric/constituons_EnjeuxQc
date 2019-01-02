
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

  constructor(public auth: AuthenticationService,private bottomSheet: MatBottomSheet) {}

ngOnInit(){
  this.opened = true;
  setTimeout(() => {
    this.opened = false;
  }, 1000);
  if (window.screen.width < 600) { // 768px portrait
    this.mode = 'push';
    this.opened = false;
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

export class BottomSheetOverviewExampleSheet implements AfterViewInit{

  @ViewChild('radioGroup') radioGroup: MatRadioGroup;

  details: UserDetails;
  espaces: any;
  espacesName:any;
  downloadJsonHref:any;
  Name:string; 
  myFile:File; /* property of File type */
  espaceChosen:string;
  edt_name=""

  constructor(
    public auth: AuthenticationService, 
    private sanitizer: DomSanitizer, 
    private api: ApiService, 
    public dataService: DataService, 
    private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>
    ) {
      this.getUserEdts()
      console.log("User details : ",this.auth.getUserDetails())
    
    }

  
  getUserEdts(){
    this.api.getUser(this.auth.getUserDetails()._id)
      .subscribe(res => {
        console.log("espaceDeTravail res after created : ",+res);
        this.espaces = res.edts
        this.espacesName = res.edts.map(x=>{return {nom:x.nom,checked:(this.dataService.edT_nom == x.nom)}});
        
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
        }, (err) => {
          console.log(err);
        });
        this.bottomSheetRef.afterOpened().subscribe(x=>{
          //this.espacesName = this.espaces.map(x=>{return {nom:x.nom,checked:(this.dataService.edT_nom == x.nom)}});
        })
  }

  ngAfterViewInit(){
    
  }

  onLogin(event){
    console.log("User details : ",this.auth.getUserDetails())
    this.getUserEdts()
  }

  radioChange(event: MatRadioChange) {
    let nom = event.value.nom
    this.dataService.edT = this.nameToId(nom)
    this.dataService.edT_nom = nom
    this.getUserEdts()
}
  nameToId(name){
    for(let e of this.espaces){
      if(name == e.nom){
        return e._id;
      }
    }
    return false;
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
    this.api.uploadFile(this.edt_name,this.myFile)
      .subscribe((data) => console.log("data : ",data));
  }

}