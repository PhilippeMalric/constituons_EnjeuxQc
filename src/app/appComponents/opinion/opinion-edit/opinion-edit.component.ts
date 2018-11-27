import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-opinion-edit',
  templateUrl: './opinion-edit.component.html',
  styleUrls: ['./opinion-edit.component.css']
})
export class OpinionEditComponent implements OnInit {

  enjeuxId:string[];
  opinionForm: FormGroup;
  id:string = '';
  enjeu:string = '';
  title:string = '';
  author:string = '';
  description:string = '';
  matcher:any;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.enjeuxId  = this.route.snapshot.params['enjeuId']
    this.getOpinion(this.route.snapshot.params['id']);
    this.opinionForm = this.formBuilder.group({
      'title' : [null, Validators.required],
      'author' : [null, Validators.required],
      'description' : [null, Validators.required]
    });
  }

  getOpinion(id) {
    this.api.getOpinion(id).subscribe(data => {
      this.id = data._id;
      this.opinionForm.setValue({
        title: data.title,
        author: data.author,
        description: data.description
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.updateOpinion(this.id, form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/opinion-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  opinionDetails() {
    this.router.navigate(['/opinion-details', this.id]);
  }
}
