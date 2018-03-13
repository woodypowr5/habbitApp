import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Marker } from '../../shared/marker.model';
import { Plan } from './../plan.model';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  private selectedMarkers: Marker[] = [];
  @Input() availableMarkers: Marker[];
  @Input() myPlan: Plan;
  @Input() isLoading: boolean;
  @Input() markerAddedToPlan;
  @Input() markerRemovedFromPlan;

  @Output() markerAddedToPlanParent = new EventEmitter<Marker>();
  @Output() markerRemovedFromPlanParent = new EventEmitter<Marker>();
  // @Output() myPlanOut = new EventEmitter<Plan>();

  ngOnInit() {}

  isInPlan(marker) {
    for (let index = 0; index < this.myPlan.markers.length; index++) {
      if (this.myPlan.markers[index].name === marker.name) {
        return true;
      }
    }
    return false;
  }

  addMarkerToPlan(marker) {
    this.markerAddedToPlanParent.emit(marker);
  }

  removeMarkerFromPlan(marker) {
    this.markerRemovedFromPlanParent.emit(marker);
  }

}
