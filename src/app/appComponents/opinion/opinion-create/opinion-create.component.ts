import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Personne } from "../../../class/Personne"


@Component({
  selector: 'app-opinion-create',
  templateUrl: './opinion-create.component.html',
  styleUrls: ['./opinion-create.component.css']
})
export class OpinionCreateComponent implements OnInit {

  myControl = new FormControl();
  options: string[] =[]

  personnes:Personne[];

  @Input() enjeuId:String;

  titreFormGroup: FormGroup;
  descriptionFormGroup: FormGroup;
  authorFormGroup: FormGroup;

  title:string='';
  description:string='';
  author:string='';

  @Output() opinionEvent = new EventEmitter<string>();

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.api.getPersonnes().subscribe((data:Personne[]) => {
      this.personnes = data;
      this.options = data.map((e:Personne)=>{return ""+e.nom})
    })

    this.titreFormGroup = this.formBuilder.group({
      'title' : [null, Validators.required]
    });
    this.descriptionFormGroup = this.formBuilder.group({
      'description' : [null, Validators.required]
    });
    this.authorFormGroup = this.formBuilder.group({
      'author' : [null, Validators.required]
    });
  }


  onFormSubmitStep = (titreFormGroup,descriptionFormGroup,authorFormGroup) => {

    this.api.postOpinion({
      'enjeuId' :this.enjeuId,
      'title' :titreFormGroup.value.title,
      'description' : descriptionFormGroup.value.description,
      'author' : authorFormGroup.value.author,
      'personne':{
        nom:"nom",
        prenom:"",
        slogan: "",
        photo:""
      },
      personneId:this.getPersonneId(authorFormGroup.value.author)
    })
    .subscribe(res => {
      console.log("postOpinion : ",res)
        let id = res['_id'];
        this.opinionEvent.emit(id)
      }, (err) => {
        console.log(err);
      });
  }

0
getPersonneId(name){
  for (let p of this.personnes){

    if(p.nom == name){
      return p._id;
    }
  }
}

  multiplePost(){

    console.log("multiple")
    let interval = setInterval(() => {
      this.api.postOpinion({
        'enjeu' : "FromMultiple",
        'title' :"titre"+Math.floor(Math.random() * 100),
        'description' : "description"+Math.floor(Math.random() * 100),
        'author' : "author"+Math.floor(Math.random() * 100),
        'personne':{
          nom:"nom",
          prenom:"",
          slogan: "",
          photo:""
        }
      })
      .subscribe(res => {
         console.log("res",res)
        }, (err) => {
          console.log(err);
        });
      }, 100);
    setTimeout(() => {
      clearInterval(interval)
      this.router.navigate(['/opinions'])
      },1500)
  }
}
