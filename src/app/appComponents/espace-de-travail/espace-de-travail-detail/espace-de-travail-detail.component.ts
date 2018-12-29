import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-espace-de-travail-detail',
  templateUrl: './espace-de-travail-detail.component.html',
  styleUrls: ['./espace-de-travail-detail.component.css']
})
export class EspaceDeTravailDetailComponent implements OnInit {

  espaceDeTravail:any = {};
  espaceDeTravailId = "";
 


  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.espaceDeTravailId = this.route.snapshot.params['id']
    this.getEspaceDeTravailDetails(this.espaceDeTravailId);
  }

  getEspaceDeTravailDetails(id) {
    this.api.getEspaceDeTravail(id)
      .subscribe(data => {
        console.log("espaceDeTravail : ",data);
        this.espaceDeTravail = data;
      });
  }

  deleteEspaceDeTravail(id) {
    this.api.deleteEspaceDeTravail(id)
      .subscribe(res => {
          this.router.navigate(['/espaceDeTravail']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}

