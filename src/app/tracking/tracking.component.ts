import { PlanService } from './../plan/plan.service';
import { UserData } from './../auth/userData.model';
import { History } from './history.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { TrackingService } from './tracking.service';
import * as fromTracking from './tracking.reducer';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  private userData: UserData;
  private history: History;
  constructor(private trackingService: TrackingService, private store: Store<fromTracking.State>) {}

  ngOnInit() {
    this.fetchMyHistory();
  }

  fetchMyHistory() {
    this.trackingService.history$.subscribe(
      history => {this.history = history;
      console.log(history);}
    );
  }

}
