import { getAvailableMarkers } from './../shared/marker.reducer';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

import { MarkerService } from '../shared/marker.service';
import { PlanService } from './plan.service';
import { UIService } from './../shared/ui.service';
import { Plan } from './plan.model';
import { Marker } from '../shared/marker.model';
import { UserData } from './../auth/userData.model';

import * as fromMarker from '../shared/marker.reducer';
import * as fromRoot from '../app.reducer';
import * as fromPlan from './plan.reducer';


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  private myPlan: Plan;
  private availableMarkers: Marker[];
  isLoading$: Observable<boolean>;
  @Input() markerAddedToPlanParent;
  @Input() markerRemovedFromPlanParent;

  constructor(
    private markerService: MarkerService,
    private planService: PlanService,
    private uiService: UIService,
  ) {}

  ngOnInit() {
    this.fetchMyPlan();
    this.fetchAvailableMarkers();
  }

  fetchMyPlan() {
    this.planService.plan$.subscribe(
      plan => this.myPlan = plan
    );
  }

  fetchAvailableMarkers() {
    this.markerService.availableMarkers$.subscribe( markers => {
      this.availableMarkers = markers;
    });
  }

  addMarkerToPlan(marker) {
    marker.isLoading = false;
    this.planService.addMarkerToPlan(marker);
  }

  removeMarkerFromPlan(marker) {
    marker.isLoading = false;
    this.planService.removeMarkerFromPlan(marker);
  }


}
