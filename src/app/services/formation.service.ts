import {Injectable} from '@angular/core';
import {Formation} from '../models/Formation.model';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FormationService {

  formations: Formation[] = [];
  formationSubject = new Subject<Formation[]>();

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
    this.http.get('http://localhost:8080/formations')
      .toPromise().then(response => response.json()).then(response => this.formations = response);
    this.emitFormations();
  }

  creerFormation(formation: Formation) {
    return this.http.post('http://localhost:8080/formations', formation)
      .map(response => response);
  }

  modifierFormation(formation: Formation) {
    return this.http.put('http://localhost:8080/formations/' + formation.id, formation)
      .map(response => response);
  }


  emitFormations() {
    this.formationSubject.next(this.formations);
  }
}
