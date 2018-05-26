import { DateService } from './../shared/date.service';
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
  private activeRecord: Record;
  private mockRecord: Record = {
    id: null,
    date: new Date(),
    measurements: []
  };
  private history: History;
  private historySubscription: Subscription;
  private myPlan: Plan;
  private planSubscription: Subscription;
  private activeDate;
  constructor(
    private trackingService: TrackingService,
    private planService: PlanService,
    private dateService: DateService) {
  }
  private activeId: number = null;

  ngOnInit() {
    this.historySubscription = this.trackingService.historyChanged.subscribe(history => {
      this.history = history;
      this.activeRecord = this.getRecordForDate(this.history.records, this.activeDate);
    });
    this.planService.planChanged.subscribe(plan =>
       this.myPlan = plan
    );
  }

  ngOnDestroy() {
    this.historySubscription.unsubscribe();
  }

  getRecordForDate(records, date) {
    const indexDate = moment(new Date(date + ', ' + new Date().getFullYear()));
    return this.queryRecordsByDate(records, indexDate);
  }

  queryRecordsByDate(records, date) {
      const record: Record = {  
        id: null,
        date: null,
        measurements: []
      }
      const foundRecord = records.filter(currentRecord => {
        if (this.dateService.isSameDate(currentRecord.date, date)) {
            return currentRecord;
        }
      });
      if (foundRecord.length > 0) {
        return foundRecord[0];
      }
      return record;
  }

  addRecord() {
    const randomDate = Math.ceil(Math.trunc((Math.random() * 30)));
    const convertedDate = moment().add(randomDate, 'day');
    this.mockRecord.date = convertedDate.toDate();
    this.trackingService.addRecordtoHistory(this.mockRecord);
  }

  setActiveRecord(record: Record) {
    if (record) {
      this.activeRecord = record;
    } else {
      this.activeRecord = {
        id: null,
        date: null,
        measurements: []
      };
    }
  }

  setActiveDate(date) {
    this.activeDate = date;
  }

}
