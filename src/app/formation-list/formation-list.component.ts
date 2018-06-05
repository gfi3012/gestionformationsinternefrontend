import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Formation} from '../models/Formation.model';
import {FormationService} from '../services/formation.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {ConfirmationService, Message} from 'primeng/api';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit, OnDestroy {

  formationSubscription: Subscription;
  formations: Formation[];
  formation: Formation;
  displayFormDialog: boolean;
  formationForm: FormGroup;
  msgs: Message[];
  idFormation: number;

  constructor(private formationService: FormationService, private router: Router, private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.formations = [];
    this.displayFormDialog = false;
    this.msgs = [];
    this.idFormation = 0;
    this.chercherTop5Formations();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.formationSubscription.unsubscribe();
  }

  chercherTop5Formations() {
    this.formationSubscription = this.formationService.chercherTop5Formations().subscribe(data => {
        this.formations = data;
      },
      error => {
        console.log('Erreur ! : ' + error);
      });
  }

  initForm() {
    this.formationForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(1)]],
      domaine: '',
      objectif: ['', [Validators.required, Validators.minLength(1)]],
      budget: [0, Validators.min(0)]
    });
  }


  onFilterFormationsByName(nomFormation: string) {
    this.formationSubscription = this.formationService.chercherFormationsParNom(nomFormation).subscribe(data => {
        this.formations = data;
      },
      error => {
        console.log('Erreur ! : ' + error);
      });
  }

  getFormationById(id: number) {
    const formation = this.formations.find(
      (f) => {
        return f.id === id;
      }
    );
    return formation;
  }

  supprimerFormation() {
    if (this.idFormation !== 0) {
      this.formationService.supprimerFormation(this.idFormation);
      this.idFormation = 0;
      this.chercherTop5Formations();
    }
  }

  onShowDeleteDialog(id: number) {
    this.idFormation = id;
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette formation ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.supprimerFormation();
        this.msgs = [{severity: 'success', summary: 'Information', detail: 'Données supprimées avec succès.'}];
      }
    });
  }

  onShowFormDialog(id: number) {
    this.displayFormDialog = true;
    if (id !== 0) {
      this.idFormation = id;
      this.formation = this.getFormationById(this.idFormation);
      this.formationForm = this.formBuilder.group({
        nom: [this.formation.nom, [Validators.required, Validators.minLength(1)]],
        domaine: this.formation.domaine,
        objectif: [this.formation.objectif, [Validators.required, Validators.minLength(1)]],
        budget: [this.formation.budget, Validators.min(0)]
      });
    } else if (id === 0) {
      this.formationForm = this.formBuilder.group({
        nom: ['', [Validators.required, Validators.minLength(1)]],
        domaine: '',
        objectif: ['', [Validators.required, Validators.minLength(1)]],
        budget: [0, Validators.min(0)]
      });
    }
  }

  onSubmitForm() {
    if (this.idFormation === 0) {
      const formValue = this.formationForm.value;
      this.formation = new Formation(
        null,
        formValue['nom'],
        formValue['domaine'],
        formValue['objectif'],
        formValue['budget']
      );
      this.formationService.creerFormation(this.formation);
    } else if (this.idFormation !== 0) {
      const formValue = this.formationForm.value;
      this.formation = new Formation(
        this.idFormation,
        formValue['nom'],
        formValue['domaine'],
        formValue['objectif'],
        formValue['budget']
      );
      this.formationService.modifierFormation(this.formation);
    }
    this.formation = null;
    this.idFormation = 0;
    this.displayFormDialog = false;
    this.chercherTop5Formations();
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Information', detail: 'Données sauvegardées avec succès.'});
  }

  onViewFormation(id: number) {
    this.router.navigate(['/formations', 'view', id]);
  }
}
