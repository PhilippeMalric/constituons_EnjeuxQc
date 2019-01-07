import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService, UserDetails } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-personne-create',
  templateUrl: './personne-create.component.html',
  styleUrls: ['./personne-create.component.css']
})
export class PersonneCreateComponent implements OnInit {

  nom:string='';
  prenom:string='';
  slogan:string='';
  photo:string='';
  details: UserDetails;
  new=true;
  constructor(private auth: AuthenticationService, private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  text=`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  


  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      description: ['', Validators.required],
      slogan: ['', Validators.required]
    });
  }

  onFormSubmit2(form1:FormGroup,form2:FormGroup) {

    console.log(form1,form2)
    this.new = false;
    this.auth.profile().subscribe(user => {
      this.details = user;
      this.api.postPersonne({
        nom:form1.value.nom,
        prenom:form1.value.prenom,
        slogan:form2.value.slogan,
        description:form2.value.description,
        photo:"/assets/images/smile/sm"+(1+Math.floor(Math.random() * 12))+".jpeg",
        userId: this.details._id
      })
      .subscribe(res => {

          console.log("postPersonne : ",res)
        }, (err) => {
          console.log(err);
        });
    }, (err) => {
      console.error(err);
    });

    
    
  }

  multiplePost() {
    console.log("multiple")
    let interval = setInterval(() => {
      this.api.postPersonne({
        nom:"nom"+Math.floor(Math.random() * 100),
        prenom:"prenom"+Math.floor(Math.random() * 100),
        slogan: this.text.substring(20 + Math.floor(Math.random() * 50)),
        photo:"/assets/images/smile/sm"+(1+Math.floor(Math.random() * 12))+".jpeg"
      })
      .subscribe(res => {
         console.log("res",res)
        }, (err) => {
          console.log(err);
        });
      }, 100);
    setTimeout(() => {
      clearInterval(interval)
      
      },1500)
  }



}
