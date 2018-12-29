import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DataService } from 'src/app/sharedServices';


@Component({
  selector: 'app-espace-de-travail-create',
  templateUrl: './espace-de-travail-create.component.html',
  styleUrls: ['./espace-de-travail-create.component.css']
})
export class EspaceDeTravailCreateComponent implements OnInit {

  id:string;
  nomFormGroup: FormGroup;
  descFormGroup: FormGroup;
  authorisedUsersFormGroup: FormGroup;
  User:any;
  options:string[] =[]

  nom:string='';
  description:string='';
  authorisedUsers:string[]
  pro:string='';

  text=`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

  constructor(private auth: AuthenticationService, public dataService: DataService, private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log("init create EspaceDeTravail")
    this.api.getUsers().subscribe((data:any[]) => {
      this.User = data;
      this.options = data.map((e:any)=>{return ""+e.name})
    })
    let userId = this.auth.getUserDetails()._id
    this.api.postEspaceDeTravail({
      'nom' :"",
      'description' :"",
      'authorisedUsers' :[],
      'proprietaire' : userId,
      "enjeux":[]
    })
      .subscribe(res => {
        console.log("espaceDeTravail res after created : ",+res);
          this.id = res['_id'];
          
        }, (err) => {
          console.log(err);
        });
    
    this.nomFormGroup = this.formBuilder.group({
      'nom' : [null, Validators.required]
    });
    this.descFormGroup = this.formBuilder.group({
      'description' : [null, Validators.required]
    });
    this.authorisedUsersFormGroup = this.formBuilder.group({
      'authorisedUsers' : [null,Validators.required]
    });

  }

  fromNameToID(name){
    for(let u of this.User){
      if(u.name == name){
        return [u.id]
      }
    }
  }

onFormSubmitStep = (form1:FormGroup,form2:FormGroup,form3:FormGroup) => {
  let usersId = this.fromNameToID(form3.value.authorisedUsers)
  console.log("userId : ",usersId)
  this.api.updateEspaceDeTravail(this.id,{
    'nom' :form1.value.nom,
    'description' :form2.value.description,
    'authorisedUsers' : usersId
  })
    .subscribe(res => {
      this.router.navigate(['/espace-de-travail-details', this.id]);
      }, (err) => {
        console.log(err);
      });
}


multiplePost(){

  console.log("multiple")
  let interval = setInterval(() => {
    this.api.postEspaceDeTravail( {
      'nom' :"titre"+Math.floor(Math.random() * 100),
      'description' :this.text.substring(20 + Math.floor(Math.random() * (this.text.length - 20))),
      'authorisedUsers' :[]
    })
    .subscribe(res => {
       console.log("res",res)
      }, (err) => {
        console.log(err);
      });
    }, 100);
  setTimeout(() => {
    clearInterval(interval)
    this.router.navigate(['/espaceDeTravail'])
    },1500)

}

}

