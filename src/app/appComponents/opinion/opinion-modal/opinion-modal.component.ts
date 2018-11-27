import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Personne } from 'src/app/class/Personne';
import { ApiService } from 'src/app/api.service';

export interface DialogData {
  title: string;
  description: string;
  author: string;
}

@Component({
  selector: 'app-opinion-modal',
  templateUrl: './opinion-modal.component.html',
  styleUrls: ['./opinion-modal.component.css']
})
export class OpinionModalComponent implements OnInit {


  @Input() enjeu:string;


  
  title: string;
  description: string;
  author: string;
  
  options: string[] =[]
  personnes:Personne[];

  constructor(public dialog: MatDialog, private api: ApiService) { }

  ngOnInit() {

    this.api.getPersonnes().subscribe((data:Personne[]) => {
      this.personnes = data;
      this.options = data.map((e:Personne)=>{return ""+e.nom})
    })

    this.api.postOpinion({
      'enjeuId' :this.enjeu,
      'title' :"",
      'description' : "",
      'author' : "",
      'personne':{
        nom:"nom",
        prenom:"",
        slogan: "",
        photo:""
      }
    })
    .subscribe(res => {
        let id = res['_id'];
        this.api.addOpinion(""+this.enjeu,{opinionId:id})
        //this.opinionEvent.emit(id)
      }, (err) => {
        console.log(err);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddOpinion, {
      width: '250px',
      data: {enjeu: "", animal: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.title = result.title;
      this.description = result.title
      this.author = result.author
    });
  }
}

@Component({
  selector: 'app-dialog-add-opinion',
  templateUrl: 'dialogAddOpinion.html',
})
export class DialogAddOpinion {
  options: string[] =[]
  constructor(
    public dialogRef: MatDialogRef<DialogAddOpinion>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}