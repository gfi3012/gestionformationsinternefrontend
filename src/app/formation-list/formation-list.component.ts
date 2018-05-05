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

  formations: Formation[] = [];
  filtredFormations: Formation[];
  formationSubscription: Subscription;
  private _listFormationFilter: string;

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
    this.filtredFormations = this.formations;
  }

  ngOnDestroy() {
    this.formationSubscription.unsubscribe();
  }

  onViewFormation(id: number) {
    this.router.navigate(['/formations', 'view', id]);
  }

  performFilter(filter: string): Formation[] {
    filter = filter.toLowerCase();
    return this.formations.filter((formation: Formation) => formation.nom.toLocaleLowerCase().indexOf(filter) !== -1);
  }

  get listFormationFilter(): string {
    return this._listFormationFilter;
  }

  set listFormationFilter(value: string) {
    this._listFormationFilter = value;
    this.filtredFormations = this.listFormationFilter ? this.performFilter(this.listFormationFilter) : this.formations;
  }
}
