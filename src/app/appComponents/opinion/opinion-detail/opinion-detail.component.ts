import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';


@Component({
  selector: 'app-opinion-detail',
  templateUrl: './opinion-detail.component.html',
  styleUrls: ['./opinion-detail.component.css']
})
export class OpinionDetailComponent implements OnInit {

  @Input() enjeuxId:string[];
  @Input() id :string[];
  opinion :any = {};

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    if(this.enjeuxId == []){
      this.enjeuxId = this.route.snapshot.params['enjeuId']
    }
    if(this.id == []){
      this.id = this.route.snapshot.params['id']
    }
    this.getOpinionDetails(this.route.snapshot.params['id']);
  }

  getOpinionDetails(id) {
    this.api.getOpinion(id)
      .subscribe(data => {
        console.log(data);
        this.opinion = data;
      });
  }

  deleteOpinion(id) {
    this.api.deleteOpinion(id)
      .subscribe(res => {
          this.router.navigate(['/opinions']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  deleteOpinionFromOneEnjeu() {
    this.api.deleteOpinionFromOneEnjeu(this.id,this.enjeuxId)
      .subscribe(res => {
          this.router.navigate(['/enjeu-details',this.enjeuxId]);
        }, (err) => {
          console.log(err);
        }
      );
  }


  
  addLike(id){
    this.api.addLikeToEnjeux(id)
  }
  
  addDontLike(id){
    this.api.addDontLikeToEnjeux(id)
  }

}
