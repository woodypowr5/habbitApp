import { UIService } from './../../../shared/ui.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
// import { NgForm } from '@angular/forms';

import { Marker } from '../../../shared/marker.model';
import { Plan } from './../../plan.model';

@Component({
  selector: 'app-active-marker-card',
  templateUrl: './active-marker-card.component.html',
  styleUrls: ['./active-marker-card.component.css']
})
export class ActiveMarkerCardComponent implements OnInit, OnChanges {
  @Input() marker: Marker;
  @Input() myPlan: Plan;
  @Input() isInPlan: boolean;
  @Output() markerRemovedFromPlan = new EventEmitter<Marker>();
  isLoading: boolean;

  constructor() {}

  ngOnInit() {
    this.isLoading = false;
  }

  ngOnChanges() {
    this.isLoading = this.marker.isLoading;
  }

  removeMarkerFromPlan(marker) {
    this.isLoading = true;
    // marker.isLoading = false;
    // setTimeout(() => {
      this.markerRemovedFromPlan.emit(marker);
    // }, 1000);
  }

}
