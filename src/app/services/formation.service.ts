import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Formation} from '../models/Formation.model';


@Injectable()
export class FormationService {

  webApiUrl = 'http://localhost:8080/formations';

  constructor(private httpClient: HttpClient) {
  }

  chercherTop5Formations() {
    return this.httpClient.get<Formation[]>(this.webApiUrl);
  }

  chercherFormationsParNom(nomFormation: string) {
    return this.httpClient.get<Formation[]>(this.webApiUrl + '/' + nomFormation);
  }

  chercherFormationParId(idFormation: number) {
    return this.httpClient.get<Formation>(this.webApiUrl + '/' + idFormation);
  }

  creerFormation(formation: Formation) {
    this.httpClient.post(this.webApiUrl, formation).subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  modifierFormation(formation: Formation) {
    this.httpClient.put(this.webApiUrl + '/' + formation.id, formation).subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  supprimerFormation(idFormation: number) {
    this.httpClient.delete(this.webApiUrl + '/' + idFormation).subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }
}
