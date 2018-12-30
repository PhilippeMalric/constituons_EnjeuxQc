
import {ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation, Input} from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { environment } from "../../environments/environment"

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

  constructor(public auth: AuthenticationService, changeDetectorRef: ChangeDetectorRef) {}

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
}
