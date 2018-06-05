import {SessionFormation} from './SessionFormation.model';

export class Formation {
  id: number;
  nom: string;
  domaine: string;
  objectif: string;
  budget: number;
  sessionsFormation: SessionFormation[];

  constructor(id: number,
              nom: string,
              domaine: string,
              objectif: string,
              budget: number) {
    this.id = id;
    this.nom = nom;
    this.domaine = domaine;
    this.objectif = objectif;
    this.budget = budget;
  }
}
