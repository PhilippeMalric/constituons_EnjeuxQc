import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-espace-de-travail-edit',
  templateUrl: './espace-de-travail-edit.component.html',
  styleUrls: ['./espace-de-travail-edit.component.css']
})
export class EspaceDeTravailEditComponent implements OnInit {

  nomFormGroup: FormGroup;
  descFormGroup: FormGroup;

  id:string = '';
  nom:string = '';
  description:string = '';
  authorisedUsers:string[] = [];
  matcher:any;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    console.log("id : ",this.id )

    this.getEdT(this.id )
    this.nomFormGroup = this.formBuilder.group({
      nom: new FormControl()});

    this.descFormGroup = this.formBuilder.group({
      description: new FormControl()});

    
  }

  getEdT(id) {
    this.api.getEspaceDeTravail(id).subscribe(data => {
      console.log("espace de travail data : ",data)
      //this.id = data._id;
      
      this.nomFormGroup.setValue({
        nom:data.nom
      })
      this.descFormGroup.setValue({
        description:data.description
      })
      
    });
  }

  onFormSubmit(form1:FormGroup,form2:FormGroup) {
    this.api.updateEnjeu(this.id, {

    titre: form1.value.titre,
    description: form2.value.description

    })
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/espace-de-travail-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  onOpinionFormSubmit(form:FormGroup) {
    //console.log("id",this.id)
    this.api.addOpinion(this.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/espace-de-travail-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }


  enjeuDetails() {
    this.router.navigate(['/espace-de-travail-details', this.id]);
  }


}