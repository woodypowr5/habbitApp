import { RecordsComponent } from './records/records.component';
import { Record } from './record.model';
import { PlanService } from './../plan/plan.service';
import { History } from './history.model';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { TrackingService } from './tracking.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnDestroy {
  private activeRecord: Record;
  private mockRecord: Record = {
    date: Date(),
    measurements: []
  };
  private history: History;
  private historySubscription: Subscription;

  constructor(
    private trackingService: TrackingService) {
  }

  ngOnInit() {
    this.historySubscription = this.trackingService.historyChanged.subscribe((history) => {
      this.history = history;
      this.activeRecord = history.records[0];
    });
  }

  ngOnDestroy() {
    this.historySubscription.unsubscribe();
  }

  addRecord(mockRecord) {
    mockRecord.date = new Date();
    this.trackingService.addRecordtoHistory(mockRecord);
  }

  setActiveRecord(record) {
    this.activeRecord = record;
  }

}
