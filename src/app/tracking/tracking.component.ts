import { PlanService } from './../plan/plan.service';
import { UserData } from './../auth/userData.model';
import { History } from './history.model';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  private historySubscription: Subscription;
  
  constructor(
    private trackingService: TrackingService) {
  }

  ngOnInit() {
    this.trackingService.historyChanged.subscribe((val) => {
      console.log(val);
    })
  }



}
