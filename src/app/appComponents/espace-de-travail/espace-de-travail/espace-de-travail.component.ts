import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DataService } from 'src/app/sharedServices';

@Component({
  selector: 'app-espace-de-travail',
  templateUrl: './espace-de-travail.component.html',
  styleUrls: ['./espace-de-travail.component.css']
})
export class EspaceDeTravailComponent implements OnInit {
  espaces : any[]
  constructor(private router: Router, private route: ActivatedRoute,private api: ApiService, public dataService: DataService) { }

  ngOnInit() {
    console.log("init  EspaceDeTravail")
  
    this.api.getEspacesDeTravail()
    .subscribe(res => {
      console.log("espaces : ",res)
      this.espaces = res
    })
  }

  clean(){
    this.api.cleanEspacesDeTravail()
      .subscribe(res => {
      console.log("res : ",res)
    })
  }

}
