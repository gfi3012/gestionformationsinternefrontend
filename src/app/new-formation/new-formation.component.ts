import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormationService} from '../services/formation.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Formation} from '../models/Formation.model';

@Component({
  selector: 'app-new-formation',
  templateUrl: './new-formation.component.html',
  styleUrls: ['./new-formation.component.css']
})
export class NewFormationComponent implements OnInit, OnDestroy {

  formationForm: FormGroup;
  formationSubscription: Subscription;
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
    this.formationSubscription = this.formationService.creerFormation(newFormation)
      .subscribe(data => {
          console.log(data);
          this.messageSuccess = true;
        },
        error => {
          console.log('Erreur ! : ' + error);
        });
  }

  onResetAll() {
    this.messageSuccess = false;
  }

  ngOnDestroy() {
    this.formationSubscription.unsubscribe();
  }
}
