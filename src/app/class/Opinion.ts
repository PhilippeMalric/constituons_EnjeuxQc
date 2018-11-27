import { Enjeux } from "./Enjeux";

export class Opinion {
  titre: String;
  enjeuxParent?: Enjeux | null;
  description: String

  constructor(titre: String, description: String) {
    
    this.titre = titre;
    this.description = description;
    
  }

  addEnjeux(enjeuxParent: Enjeux) {

    this.enjeuxParent = enjeuxParent;

  }

  log() {
    console.log("titre : ", this.titre)
  }





}

