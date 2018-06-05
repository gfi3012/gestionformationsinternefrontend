import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FormationService} from '../services/formation.service';
import {SessionFormationService} from '../services/session-formation.service';
import {Subscription} from 'rxjs/Subscription';
import {Formation} from '../models/Formation.model';
import {SessionFormation} from '../models/SessionFormation.model';
import {ConfirmationService, Message} from 'primeng/api';


@Component({
  selector: 'app-session-formation-list',
  templateUrl: './session-formation-list.component.html',
  styleUrls: ['./session-formation-list.component.css']
})
export class SessionFormationListComponent implements OnInit, OnDestroy {


  sessionFormationSubscription: Subscription;
  sessionsFormation: SessionFormation[];
  formation: Formation;
  sessionFormation: SessionFormation;
  displayFormDialog: boolean;
  sessionFormationForm: FormGroup;
  msgs: Message[];
  idSessionFormation: number;
  calendar_fr: any;

  constructor(private formationService: FormationService, private sessionFormationService: SessionFormationService,
              private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.formation = new Formation(null, '', '', '', null);
    this.sessionsFormation = [];
    this.displayFormDialog = false;
    this.msgs = [];
    this.idSessionFormation = 0;
    this.calendarInit();
    this.chercherFormationParId();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.sessionFormationSubscription.unsubscribe();
  }

  calendarInit() {
    this.calendar_fr = {
      firstDayOfWeek: 1,
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
      monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
      today: 'Aujourd\'hui',
      clear: 'Effacer'
    };
  }

  chercherFormationParId() {
    const id = this.route.snapshot.params['id'];
    this.sessionFormationSubscription = this.formationService.chercherFormationParId(+id).subscribe(data => {
        this.formation = data;
        this.chercherSessionsFormationParIdFormation(this.formation.id);
      },
      error => {
        console.log('Erreur ! : ' + error);
      });
  }

  chercherSessionsFormationParIdFormation(idFormation: number) {
    this.sessionFormationService.chercherSessionsFormationParIdFormation(idFormation).subscribe(data => {
        this.sessionsFormation = data;
      },
      error => {
        console.log('Erreur ! : ' + error);
      });
  }

  initForm() {
    this.sessionFormationForm = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      nbrPlaces: [1, Validators.min(1)],
      lieu: ''
    });
  }

  getSessionFormationById(id: number) {
    const sessionFormation = this.sessionsFormation.find(
      (s) => {
        return s.id === id;
      }
    );
    return sessionFormation;
  }

  supprimerSessionFormation() {
    if (this.idSessionFormation !== 0) {
      this.sessionFormationService.supprimerSessionFormation(this.idSessionFormation);
      this.idSessionFormation = 0;
      this.chercherFormationParId();
    }
  }

  onShowDeleteDialog(id: number) {
    this.idSessionFormation = id;
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir supprimer cette session de formation ?',
      header: 'Confirmation de suppression',
      icon: 'fa fa-trash',
      accept: () => {
        this.supprimerSessionFormation();
        this.msgs = [{severity: 'success', summary: 'Information', detail: 'Données supprimées avec succès.'}];
      }
    });
  }

  onShowFormDialog(id: number) {
    this.displayFormDialog = true;
    if (id !== 0) {
      this.idSessionFormation = id;
      this.sessionFormation = this.getSessionFormationById(this.idSessionFormation);
      const dateDebut = new Date(this.sessionFormation.dateDebut);
      const dateFin = new Date(this.sessionFormation.dateFin);
      this.sessionFormationForm = this.formBuilder.group({
        dateDebut: [dateDebut, Validators.required],
        dateFin: [dateFin, Validators.required],
        nbrPlaces: [this.sessionFormation.nbrPlaces, Validators.min(1)],
        lieu: this.sessionFormation.lieu
      });
    } else if (id === 0) {
      this.sessionFormationForm = this.formBuilder.group({
        dateDebut: ['', Validators.required],
        dateFin: ['', Validators.required],
        nbrPlaces: [1, Validators.min(1)],
        lieu: ''
      });
    }
  }

  onSubmitForm() {
    if (this.idSessionFormation === 0) {
      const formValue = this.sessionFormationForm.value;
      this.sessionFormation = new SessionFormation(
        null,
        formValue['dateDebut'],
        formValue['dateFin'],
        formValue['nbrPlaces'],
        formValue['lieu'],
        this.formation
      );
      this.sessionFormationService.creerSessionFormation(this.sessionFormation);
    } else if (this.idSessionFormation !== 0) {
      const formValue = this.sessionFormationForm.value;
      this.sessionFormation = new SessionFormation(
        this.idSessionFormation,
        formValue['dateDebut'],
        formValue['dateFin'],
        formValue['nbrPlaces'],
        formValue['lieu'],
        this.formation
      );
      this.sessionFormationService.modifierSessionFormation(this.sessionFormation);
    }
    this.sessionFormation = null;
    this.idSessionFormation = 0;
    this.displayFormDialog = false;
    this.chercherFormationParId();
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Information', detail: 'Données sauvegardées avec succès.'});
  }

  //
  onViewSessionFormation(id: number) {
    //   this.router.navigate(['/formations', 'view', id]);
  }
}
