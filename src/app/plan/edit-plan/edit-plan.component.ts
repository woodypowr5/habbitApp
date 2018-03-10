import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/observable';

import { Marker } from '../../shared/marker.model';
import { UserData } from './../../auth/userData.model';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  @Input() availableMarkers: Marker[];

  constructor() {}

  ngOnInit() {}
  
}
