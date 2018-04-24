import {Component, OnDestroy, OnInit} from '@angular/core';
import {Formation} from '../models/Formation.model';
import {Subscription} from 'rxjs/Subscription';
import {FormationService} from '../services/formation.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit, OnDestroy {

  formations: Formation[];
  formationSubscription: Subscription;

  constructor(private formationService: FormationService, private router: Router) {
  }

  ngOnInit() {
    this.formationSubscription = this.formationService.formationSubject.subscribe(
      (formations: Formation[]) => {
        this.formations = formations;
      }
    );
    this.formationService.listerFormations();
    this.formationService.emitFormations();
  }

  ngOnDestroy() {
    this.formationSubscription.unsubscribe();
  }

  onViewFormation(id: number) {
    this.router.navigate(['/formations', 'view', id]);
  }
}
