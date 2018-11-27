import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';


@Component({
  selector: 'app-personne-detail',
  templateUrl: './personne-detail.component.html',
  styleUrls: ['./personne-detail.component.css']
})
export class PersonneDetailComponent implements OnInit {

  personne : any = {};

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getPersonneDetails(this.route.snapshot.params['id']);
  }

  getPersonneDetails(id) {
    this.api.getPersonne(id)
      .subscribe(data => {
        console.log(data);
        this.personne = data;
      });
  }

  deletePersonne(id) {
    this.api.deletePersonne(id)
      .subscribe(res => {
          this.router.navigate(['/personnes']);
        }, (err) => {
          console.log(err);
        }
      );
  }


  addLike(id){
    this.api.addLikeToEnjeux(id).subscribe(res => {},
       (err) => {
        console.log(err);
      });
  }
  
  addDontLike(id){
    this.api.addDontLikeToEnjeux(id).subscribe(res => {},
      (err) => {
       console.log(err);
     });
  }
}
