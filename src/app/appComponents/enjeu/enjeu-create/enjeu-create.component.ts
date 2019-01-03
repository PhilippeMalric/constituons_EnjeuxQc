import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { DataService } from 'src/app/sharedServices';


@Component({
  selector: 'app-enjeu-create',
  templateUrl: './enjeu-create.component.html',
  styleUrls: ['./enjeu-create.component.css']
})
export class EnjeuCreateComponent implements OnInit {

  id:string;
  opsID:string[] = []
  titreFormGroup: FormGroup;
  descFormGroup: FormGroup;
  categorieFormGroup: FormGroup;

  enjeuForm: FormGroup;

  titre:string='';
  description:string='';
  cats:string[]
  badges:string='';

  text=`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`


  opTogle:Boolean = false

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder, public dataService: DataService) {

    console.log("constructor create enjeu")

    this.titreFormGroup = this.formBuilder.group({
      'titre' : [null, Validators.required]
    });
    this.descFormGroup = this.formBuilder.group({
      'description' : [null, Validators.required]
    });
    this.categorieFormGroup = this.formBuilder.group({
      'categorie' : [null,Validators.required]
    });
 
   }

  ngOnInit = ()=>{

   console.log("init create enjeu")
   
  
  }

ngAfterViewInit(){
  console.log("ngAfterViewInit create enjeu")
  console.log("dataService : ",this.dataService);
  console.log("dataService.edT : ",this.dataService.edT);
  setTimeout(()=>{
    this.api.postEnjeu({
      'titre' :"",
      'description' :"",
      'categorie' :[],
      'badges' : this.createBadges2(),
      'edt': this.dataService.edT
    })
      .subscribe(res => {
        console.log("enjeu res : ",res);
          this.id = res['_id'];
          
        }, (err) => {
          console.log(err);
        });
    },3000)
  }

  onFormSubmitStep = (form1:FormGroup,form2:FormGroup,form3:FormGroup) => {
    this.api.updateEnjeu(this.id,{
      'titre' :form1.value.titre,
      'description' :form2.value.description,
      'categories' :this.cats,
      'opsId' : this.opsID
    })
      .subscribe(res => {
        this.router.navigate(['/enjeu-details', this.id]);
        }, (err) => {
          console.log(err);
        });
  }

  createBadges2(){
    let l = Math.floor(Math.random() * 10)
    let s = []
    for (let i = 0;i<l;i++){
      s.push(Math.floor(Math.random() * 15))
    }
    return s.join(" ");
  }

  multiplePost(){

    console.log("multiple")
    let interval = setInterval(() => {
      this.api.postEnjeu( {
        'titre' :"titre"+Math.floor(Math.random() * 100),
        'description' :this.text.substring(20 + Math.floor(Math.random() * (this.text.length - 20))),
        'categories' :(Math.random() > 0.5)?["La démocratie"]:["La santé"],
        'badges' : this.createBadges2(),
        'opsId' : []
      })
      .subscribe(res => {
         console.log("res",res)
        }, (err) => {
          console.log(err);
        });
      }, 100);
    setTimeout(() => {
      clearInterval(interval)
      this.router.navigate(['/enjeux'])
      },1500)

  }

  opinionRegistered = (event) =>{
    console.log("event",event)
    this.opsID.push(event)

  }


  categorieChosen(event:string[],stepper: MatStepper){
    console.log(event)
    this.cats = event;
    (<FormControl>this.categorieFormGroup.controls['categorie'])
      .setValue(event, { onlySelf: true });
      stepper.next()
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
