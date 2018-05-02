import { RecordsComponent } from './records/records.component';
import { Record } from './record.model';
import { PlanService } from './../plan/plan.service';
import { History } from './history.model';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { TrackingService } from './tracking.service';
import * as moment from 'moment';
import { Plan } from '../plan/plan.model';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit, OnDestroy {
  private activeRecord: Record = {
    date: null,
    measurements: []
  };
  private mockRecord: Record = {
    date: new Date(),
    measurements: []
  };
  private history: History;
  private historySubscription: Subscription;
  private myPlan: Plan;
  private planSubscription: Subscription;

  constructor(
    private trackingService: TrackingService,
    private planService: PlanService) {
  }

  ngOnInit() {
    this.historySubscription = this.trackingService.historyChanged.subscribe((history) => {
      this.history = history;
      this.activeRecord = this.history.records[0];
    });
    this.planService.planChanged.subscribe(
      plan => this.myPlan = plan
    );
  }

  ngOnDestroy() {
    this.historySubscription.unsubscribe();
  }

  addRecord() {
    const randomDate = Math.ceil(Math.trunc((Math.random() * 30)));
    const convertedDate = moment().add(randomDate, 'day');
    this.mockRecord.date = convertedDate.toDate();
    this.trackingService.addRecordtoHistory(this.mockRecord);
  }

  setActiveRecord(record) {
    if (record) {
      this.activeRecord = record;
    } else {
      this.activeRecord = {
        date: null,
        measurements: []
      };
    }
  }


}
