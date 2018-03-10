import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { MarkerService } from '../../shared/marker.service';
import { PlanService } from './../plan.service';
import { Marker } from '../../shared/marker.model';
import { UserData } from './../../auth/userData.model';
import { UIService } from '../../shared/ui.service';
import * as fromMarker from '../../shared/marker.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  availableMarkers$: Observable<Marker[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private markerService: MarkerService,
    private planService: PlanService,
    private uiService: UIService,
    private store: Store<fromMarker.State>

  ) {}
  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.availableMarkers$ = this.store.select(fromMarker.getAvailableMarkers);
    this.fetchMarkers();
  }

  fetchMarkers() {
    this.markerService.fetchAvailableMarkers();
  }

}
