import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';


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
  categorie:string='';
  badges:string='';

  text=`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`


  opTogle:Boolean = false

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {

    console.log("construct create enjeu")

    this.api.postEnjeu({
      'titre' :"",
      'description' :"",
      'categorie' :"",
      'badges' : this.createBadges2()
    })
      .subscribe(res => {
        console.log("enjeu res : ",+res);
          this.id = res['_id'];
          
        }, (err) => {
          console.log(err);
        });
      
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

  onFormSubmitStep = (form1:NgForm,form2:NgForm,form3:NgForm) => {
    this.api.updateEnjeu(this.id,{
      'titre' :form1.value.titre,
      'description' :form2.value.description,
      'categorie' :form3.value.categorie,
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
      this.api.updateEnjeu(this.id, {
        'titre' :"titre"+Math.floor(Math.random() * 100),
        'description' :this.text.substring(20 + Math.floor(Math.random() * (this.text.length - 20))),
        'categorie' :"categorie"+Math.floor(Math.random() * 100),
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
