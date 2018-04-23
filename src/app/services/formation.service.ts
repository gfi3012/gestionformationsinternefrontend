import {Injectable} from '@angular/core';
import {Formation} from '../models/Formation.model';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FormationService {

  formations: Formation[];

  constructor(private http: Http) {
  }

  getFormationById(id: number) {
    const formation = this.formations.find(
      (s) => {
        return s.id === id;
      }
    );
    return formation;
  }

  listerFormations() {
    return this.http.get('http://localhost:8080/formations')
      .map(response => response.json());
  }

  creerFormation(formation: Formation) {
    return this.http.post('http://localhost:8080/formations', formation)
      .map(response => response);
  }

  modifierFormation(formation: Formation) {

  }


}
