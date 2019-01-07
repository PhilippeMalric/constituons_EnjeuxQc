import { Component, Output, EventEmitter } from '@angular/core';
import { AuthenticationService, TokenPayload, UserDetails } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/sharedServices';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() logged = new EventEmitter();

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  details: UserDetails;
  espaces: any;
  espacesName:any;
  downloadJsonHref:any;
  Name:string; 
  myFile:File; /* property of File type */
  espaceChosen:string;
  edt_name=""

  constructor(private sanitizer: DomSanitizer, private auth: AuthenticationService, private router: Router, public dataService: DataService) {
    
  }
 

  

  login() {
    console.log("login")
    this.auth.login(this.credentials).subscribe(() => {
      this.dataService.getUser()
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.error(err);
    }); 
  }
}
