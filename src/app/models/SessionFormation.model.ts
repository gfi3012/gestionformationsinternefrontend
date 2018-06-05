import {Inscription} from './Inscription.model';
import {Utilisateur} from './Utilisateur.model';
import {Formation} from './Formation.model';

export class SessionFormation {
  id: number;
  dateDebut: Date;
  dateFin: Date;
  nbrPlaces: number;
  lieu: string;
  formation: Formation;
  inscriptions: Inscription[];
  formateur: Utilisateur;

  constructor(id: number,
              dateDebut: Date,
              dateFin: Date,
              nbrPlaces: number,
              lieu: string,
              formation: Formation) {
    this.id = id;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.nbrPlaces = nbrPlaces;
    this.lieu = lieu;
    this.formation = formation;
  }
}
