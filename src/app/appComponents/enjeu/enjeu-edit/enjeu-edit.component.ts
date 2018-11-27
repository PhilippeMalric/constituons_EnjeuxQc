import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';



@Component({
  selector: 'app-enjeu-edit',
  templateUrl: './enjeu-edit.component.html',
  styleUrls: ['./enjeu-edit.component.css']
})
export class EnjeuEditComponent implements OnInit {

  titreFormGroup: FormGroup;
  descFormGroup: FormGroup;
  catFormGroup: FormGroup;
  badgeFormGroup: FormGroup;

  _id:string[] = [''];
  id:string = '';
  titre:string = '';
  description:string = '';
  categorie:string = '';
  badges:string = '';
  opinions:any[];
  opsID:string[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this._id = [this.route.snapshot.params['id']]
    
    this.getEnjeu(this.route.snapshot.params['id']);

    this.titreFormGroup = this.formBuilder.group({
      titre: new FormControl()})
    this.descFormGroup = this.formBuilder.group({
      description: new FormControl()});
    this.catFormGroup = this.formBuilder.group({
      categorie: new FormControl()});
    this.badgeFormGroup = this.formBuilder.group({
      badges:new FormControl()});
   
  }

  getEnjeu(id) {
    this.api.getEnjeu(id).subscribe(data => {
      console.log("data : ",data)
      this.id = data._id;
      this.titreFormGroup.setValue({
        titre:data.titre
      })
      this.descFormGroup.setValue({
        description:data.description
      })
      this.catFormGroup.setValue({
        categorie:data.categorie
      })
      this.badgeFormGroup.setValue({
        badges:data.badges
      })
      
      this.opinions = data.opinions
    });
  }

  onFormSubmit(form1:NgForm,form2:NgForm,form3:NgForm,form4:NgForm) {
    this.api.updateEnjeu(this.id, {

    titre: form1.value.titre,
    description: form2.value.description,
    categorie: form3.value.categorie,
    badges: form4.value.badges,

    })
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/enjeu-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  onOpinionFormSubmit(form:NgForm) {
    //console.log("id",this.id)
    this.api.addOpinion(this.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/enjeu-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  opinionRegistered = (event) =>{
    console.log("event",event)
    this.opsID.push(event)

  }

  enjeuDetails() {
    this.router.navigate(['/enjeu-details', this.id]);
  }
}
