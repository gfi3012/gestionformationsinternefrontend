import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private formationService: FormationService, private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formationForm = this.formBuilder.group({
      nom: ['', Validators.required],
      domaine: ['', Validators.required],
      objectif: ['', Validators.required],
      budget: ['', Validators.required]
    });
  }

  onSubmitForm() {
    const formValue = this.formationForm.value;
    const newFormation = new Formation(
      null,
      formValue['nom'],
      formValue['domaine'],
      formValue['objectif'],
      formValue['budget']
    );
    this.formationService.creerFormation(newFormation)
      .subscribe(data => {
          console.log(data);
          this.messageSuccess = true;
          this.formationService.listerFormations();
        },
        error => {
          console.log('Erreur ! : ' + error);
        });
  }

  onResetAll() {
    this.messageSuccess = false;
  }

}
