import { getAvailableMarkers } from './../shared/marker.reducer';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  // private myPlan$: Observable<Plan>;
  private availableMarkers$: Observable<Marker[]>;
  isLoading$: Observable<boolean>;

  @Output() availableMarkersChanged = new EventEmitter<Plan>();

  constructor(
    private markerService: MarkerService,
    private planService: PlanService,
    private uiService: UIService,
    // private store: Store<fromMarker.State>
    private store: Store<fromPlan.State>
  ) { }

  ngOnInit() {
    this.availableMarkers$ = this.store.select(fromMarker.getAvailableMarkers);
    this.availableMarkers$.subscribe(
      newMarkers => this.myPlanChanged(newMarkers)
    );
    this.fetchMyPlan();
    this.fetchAvailableMarkers();
  }

  fetchMyPlan() {
    this.markerService.fetchAvailableMarkers();
  }

  fetchAvailableMarkers() {
    this.markerService.fetchAvailableMarkers();
  }

  myPlanChanged(newMarkers) {
    console.log(newMarkers)
    this.availableMarkersChanged.emit(newMarkers);
  }

}
