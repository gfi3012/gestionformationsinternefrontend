import {Component, OnDestroy, OnInit} from '@angular/core';
import {Formation} from '../models/Formation.model';
import {Subscription} from 'rxjs/Subscription';
import {FormationService} from '../services/formation.service';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit, OnDestroy {

  formations: Formation[];
  formationSubscription: Subscription;

  constructor(private formationService: FormationService) {
  }

  ngOnInit() {
    this.formationSubscription = this.formationService.listerFormations()
      .subscribe(data => {
          this.formations = data;
        },
        error => {
          console.log('Erreur ! : ' + error);
        });
  }


  ngOnDestroy() {
    this.formationSubscription.unsubscribe();
  }

}
