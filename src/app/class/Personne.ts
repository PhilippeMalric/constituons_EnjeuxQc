import { Opinion } from "./Opinion";

export class Personne  {
  _id:String;
  nom: String;
  prenom: String;
  photo: String;
  slogan: String;
  opinions: Opinion[];
  description?: String;
  
  constructor(nom: String, photo: String, slogan: String, opinions:Opinion[]) {
    this.nom = nom;
    this.photo = photo;
    this.slogan = slogan;
    this.opinions = opinions;
  }


  log() {
    console.log("nom : ", this.nom)
  }
}
