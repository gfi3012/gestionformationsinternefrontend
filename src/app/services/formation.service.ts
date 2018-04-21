import {Injectable} from '@angular/core';
import {Formation} from '../models/Formation.model';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FormationService {

  formations: Formation[];

  constructor(private http: Http) {
  }


  listerFormations() {
    return this.http.get('http://localhost:8080/formations')
      .map(response => response.json());
  }

  creerFormation(formation: Formation) {

  }

  modifierFormation(formation: Formation) {

  }


}
