import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable() 
export class DataService {
  edT: string = "";
  edT_nom : string = "Publique";

  constructor(private api: ApiService) {

    this.api.getEspacesDeTravail().subscribe((res)=>{

      for(let edt of res){

        if(edt.nom == this.edT_nom){
          this.edT=edt._id
        }

      }

    })

   }

}