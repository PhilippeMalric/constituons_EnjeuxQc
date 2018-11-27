import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';


@Component({
  selector: 'app-enjeu-detail',
  templateUrl: './enjeu-detail.component.html',
  styleUrls: ['./enjeu-detail.component.css']
})
export class EnjeuDetailComponent implements OnInit {

  enjeu:any = {};
  enjeuId = "";
  opinions = []
  opsID:string[] = []
  opTogle:Boolean = false
 


  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.enjeuId = this.route.snapshot.params['id']
    this.getEnjeuDetails(this.enjeuId);
  }

  getEnjeuDetails(id) {
    this.api.getEnjeu(id)
      .subscribe(data => {
        console.log("enjeux : ",data);
        this.enjeu = data;
        this.opinions = this.enjeu["opinions"]
      });
  }

  deleteEnjeu(id) {
    this.api.deleteEnjeu(id)
      .subscribe(res => {
          this.router.navigate(['/enjeux']);
        }, (err) => {
          console.log(err);
        }
      );
  }


  // A utiliser

  addLike(id){
    this.api.addLikeToEnjeux(id)
  }

  addDontLike(id){
    this.api.addDontLikeToEnjeux(id)
  }
  opinionRegistered = (event) =>{
    console.log("event",event)
    this.opsID.push(event)

  }


  onChange(value) {
    if (value.checked === true) {
      this.opTogle= true;
      console.log(1);  //1
    } else {
      this.opTogle= false;
      console.log(0); //0
    }
  }

}
