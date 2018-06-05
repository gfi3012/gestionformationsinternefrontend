import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Formation} from '../models/Formation.model';
import {SessionFormation} from '../models/SessionFormation.model';

@Injectable()
export class SessionFormationService {

  webApiUrl = 'http://localhost:8080/sessionsformation';

  constructor(private httpClient: HttpClient) {
  }

  chercherSessionsFormationParIdFormation(idFormation: number) {
    return this.httpClient.get<SessionFormation[]>(this.webApiUrl + '/formation/' + idFormation);
  }

  chercherSessionsFormationParIdFormationEtDateDebut(idFormation: number, dateDebut: string) {
    return this.httpClient.get<SessionFormation[]>(this.webApiUrl + '/formation/' + idFormation + '/datedebut/' + dateDebut);
  }

  creerSessionFormation(sessionFormation: SessionFormation) {
    this.httpClient.post(this.webApiUrl, sessionFormation).subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  modifierSessionFormation(sessionFormation: SessionFormation) {
    this.httpClient.put(this.webApiUrl + '/' + sessionFormation.id, sessionFormation).subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }
  supprimerSessionFormation(idSessionFormation: number) {
    this.httpClient.delete(this.webApiUrl + '/' + idSessionFormation).subscribe(
      () => {
        console.log('Enregistrement terminé !');
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }
}
