import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-personne-edit',
  templateUrl: './personne-edit.component.html',
  styleUrls: ['./personne-edit.component.css']
})
export class PersonneEditComponent implements OnInit {

  personneForm: FormGroup;
  id:string = '';
  nom:string = '';
  prenom:string = '';
  slogan:string = '';
  photo:string = '';
  matcher:any;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPersonne(this.route.snapshot.params['id']);
    this.personneForm = this.formBuilder.group({
      'nom' : [null, Validators.required],
      'prenom' : [null, Validators.required],
      'slogan' : [null, Validators.required],
      'photo' : [null, Validators.required]
    });
  }

  getPersonne(id) {
    this.api.getPersonne(id).subscribe(data => {
      this.id = data._id;
      this.personneForm.setValue({
        nom: data.nom,
        prenom: data.prenom,
        slogan: data.slogan,
        photo: data.photo
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.updatePersonne(this.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/personne-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  personneDetails() {
    this.router.navigate(['/personne-details', this.id]);
  }
}
