import {Opinion} from './Opinion'

export class Enjeux{

 titre: String;
 description: String;
 parent: Enjeux;
 enfants: String;
 opinions:Opinion[];


  constructor(titre: String, description: String, parent: Enjeux, enfants: String, opinions:Opinion[]) {
 
    this.titre = titre;
    this.description = description;
    this.parent = parent;
    this.enfants = enfants;
    this.opinions = opinions;
  }


  log() {
    console.log("titre : ", this.titre)
  }
}

