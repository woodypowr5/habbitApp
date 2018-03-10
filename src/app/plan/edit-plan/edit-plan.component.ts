import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Marker } from '../../shared/marker.model';
import { Plan } from './../plan.model';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  @Input() availableMarkers: Marker[];
  @Input() myPlan: Plan;

  constructor() {}

  ngOnInit() {}

}
