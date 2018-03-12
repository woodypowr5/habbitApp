import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { NgForm } from '@angular/forms';

import { Marker } from '../../../shared/marker.model';
import { Plan } from './../../plan.model';

@Component({
  selector: 'app-edit-marker-card',
  templateUrl: './edit-marker-card.component.html',
  styleUrls: ['./edit-marker-card.component.css']
})
export class EditMarkerCardComponent implements OnInit {
  @Input() marker: Marker;
  @Input() myPlan: Plan;
  @Input() isInPlan: boolean;
  @Output() markerAddedToPlan = new EventEmitter<Marker>();
  @Output() markerRemovedFromPlan = new EventEmitter<Marker>();

  constructor() { }

  ngOnInit() {
  }

  addMarkerToPlan(marker) {
    this.markerAddedToPlan.emit(marker);
  }

  removeMarkerFromPlan(marker) {
    this.markerRemovedFromPlan.emit(marker);
  }

}
