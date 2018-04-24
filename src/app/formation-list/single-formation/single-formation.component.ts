import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Formation} from '../../models/Formation.model';
import {FormationService} from '../../services/formation.service';

@Component({
  selector: 'app-single-formation',
  templateUrl: './single-formation.component.html',
  styleUrls: ['./single-formation.component.css']
})
export class SingleFormationComponent implements OnInit {

  formation: Formation;

  constructor(private formationService: FormationService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.formation = new Formation(null, '', '', '', null);
    const id = this.route.snapshot.params['id'];
    this.formation = this.formationService.getFormationById(+id);
  }

}
