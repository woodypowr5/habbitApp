import { PlanService } from './../plan/plan.service';
import { History } from './history.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { TrackingService } from './tracking.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnDestroy {
  private history: History;
  private historySubscription: Subscription;

  constructor(
    private trackingService: TrackingService) {
  }

  ngOnInit() {
    this.historySubscription = this.trackingService.historyChanged.subscribe((history) => {
      this.history = history;
    });
  }

  ngOnDestroy() {
    this.historySubscription.unsubscribe();
  }
}
