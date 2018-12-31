
import {ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation, Input} from '@angular/core';
import { AuthenticationService, UserDetails } from '../service/authentication.service';
import { environment } from "../../environments/environment"
import { MatBottomSheetRef, MatBottomSheet, MatRadioChange } from '@angular/material';
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
  templateUrl: 'bottom-sheet.html',
})

export class BottomSheetOverviewExampleSheet {

  details: UserDetails;
  espaces: any;
  espacesName:any;
  downloadJsonHref:any;
  Name:string; 
  myFile:File; /* property of File type */

  constructor(
    public auth: AuthenticationService, 
    private sanitizer: DomSanitizer, 
    private api: ApiService, 
    public dataService: DataService, 
    private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>
    ) {
      this.getUserEdts()
    }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
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