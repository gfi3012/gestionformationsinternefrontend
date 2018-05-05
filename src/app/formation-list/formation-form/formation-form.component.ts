import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Formation} from '../../models/Formation.model';
import {FormationService} from '../../services/formation.service';

@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.css']
})
export class FormationFormComponent implements OnInit {

  formationForm: FormGroup;
  messageSuccess = false;
  formation: Formation;

  constructor(private formBuilder: FormBuilder, private formationService: FormationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formation = new Formation(null, '', '', '', null);
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.formation = this.formationService.getFormationById(+id);
    }
    this.formationForm = this.formBuilder.group({
      nom: [this.formation.nom, Validators.required],
      domaine: this.formation.domaine,
      objectif: [this.formation.objectif, Validators.required],
      budget: this.formation.budget
    });
  }

  onSubmitForm() {
    if (this.formation.id === null) {
      const formValue = this.formationForm.value;
      this.formation = new Formation(
        null,
        formValue['nom'],
        formValue['domaine'],
        formValue['objectif'],
        formValue['budget']
      );
      this.formationService.creerFormation(this.formation)
        .subscribe(data => {
            console.log(data);
            this.messageSuccess = true;
            this.formationService.listerFormations();
          },
          error => {
            console.log('Erreur ! : ' + error);
          });
    } else if (this.formation.id !== null) {
      const formValue = this.formationForm.value;
      this.formation = new Formation(
        this.formation.id,
        formValue['nom'],
        formValue['domaine'],
        formValue['objectif'],
        formValue['budget']
      );
      this.formationService.modifierFormation(this.formation)
        .subscribe(data => {
            console.log(data);
            this.messageSuccess = true;
            this.formationService.listerFormations();
          },
          error => {
            console.log('Erreur ! : ' + error);
          });
    }
  }

  onResetAll() {
    this.messageSuccess = false;
  }

}
