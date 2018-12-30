import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DataService } from 'src/app/sharedServices';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-espace-de-travail',
  templateUrl: './espace-de-travail.component.html',
  styleUrls: ['./espace-de-travail.component.css']
})
export class EspaceDeTravailComponent implements OnInit {
  user:any;
  edts:any[];
  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute,private api: ApiService, public dataService: DataService) { }

  ngOnInit() {
    console.log("init  EspaceDeTravail")
    this.api.getUser(this.auth.getUserDetails()._id).subscribe((data:any) => {
      this.user = data;
      this.edts = data.edts;
    })
  }

  clean(){
    this.api.cleanEspacesDeTravail()
      .subscribe(res => {
      console.log("res : ",res)
    })
  }

}
