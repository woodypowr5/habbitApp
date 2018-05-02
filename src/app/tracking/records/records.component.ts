import { Record } from './../record.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  @Input() records;
  @Output() setNewActiveRecord: EventEmitter<Record> = new EventEmitter();
  private activeRecordIndex = 3;
  private activeDate: Date = new Date();

  constructor() { }

  ngOnInit() {}

  setActiveRecord(event, index) {
    this.setActiveDate(event.date);
    const newActiveRecord = this.getRecordForDate(event.date)[0];
    if (newActiveRecord) {
      this.setNewActiveRecord.emit(newActiveRecord.record);
    } else {
      this.setNewActiveRecord.emit(undefined);
    }
    this.activeRecordIndex = index;
  }

  setActiveDate(date) {
    this.activeDate = new Date(date + ', ' + new Date().getFullYear());
  }

  getDateByIndex(index) {
    return moment(this.activeDate).add(index - 3, 'days');
  }

  getRecordForDate(date) { // these 2 methods need to be refactored
    let record: Record = {
      date: null,
      measurements: []
    };
    let thisDate = moment(new Date(date + ', ' + new Date().getFullYear()));
    let foundRecord = this.records.filter(thisRecord => {
      if (
        (moment(thisRecord.record.date).date() === moment(thisDate).date())
        && (moment(thisRecord.record.date).month() === moment(thisDate).month())
        && (moment(thisRecord.record.date).year() === moment(thisDate).year())
      ) {
          return thisRecord;
      }
    });
    return foundRecord;
  }

  getRecordForIndex(index) {
    let record: Record = {
      date: null,
      measurements: []
    };
    let thisDate = moment(this.activeDate).add(index - 3, 'days');
    let foundRecord = this.records.filter(thisRecord => {
      if (
        (moment(thisRecord.record.date).date() === moment(thisDate).date())
        && (moment(thisRecord.record.date).month() === moment(thisDate).month())
        && (moment(thisRecord.record.date).year() === moment(thisDate).year())
      ) {
          return thisRecord;
      }
    });
    if (foundRecord.length > 0) {
      return foundRecord;
    }
  }

}
