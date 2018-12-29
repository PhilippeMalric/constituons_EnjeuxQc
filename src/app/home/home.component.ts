import { Component, OnInit } from '@angular/core';
import { DataService } from '../sharedServices';
import { AuthenticationService, UserDetails } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  checked:Boolean
  details: UserDetails;

  constructor(private auth: AuthenticationService, public dataService: DataService) { }

  ngOnInit() {

    
  }

  

}
