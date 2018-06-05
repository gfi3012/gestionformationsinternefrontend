import {SessionFormation} from './SessionFormation.model';
import {Utilisateur} from './Utilisateur.model';

export class Inscription {
  id: number;
  etat: string;
  motifDuRefus: string;
  sessionFormation: SessionFormation;
  collaborateur: Utilisateur;
}
