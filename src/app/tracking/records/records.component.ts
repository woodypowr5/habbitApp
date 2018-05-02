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
    const newActiveRecord = this.getRecordForDate(event.date);
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

  getRecordForDate(date) {
    const indexDate = moment(new Date(date + ', ' + new Date().getFullYear()));
    return this.queryRecordsByDate(indexDate);
  }

  getRecordForIndex(index) {
    const date = moment(this.activeDate).add(index - 3, 'days');
    return this.queryRecordsByDate(date);
  }

  queryRecordsByDate(date) {
    let record: Record = {
        date: null,
        measurements: []
      };
      const foundRecord = this.records.filter(currentRecord => {
        if (this.isSameDate(currentRecord.record.date, date)) {
            return currentRecord;
        }
      });
      if (foundRecord.length > 0) {
        return foundRecord[0];
      }
  }

  isSameDate(date1, date2) {
    return (moment(date1).date() === moment(date2).date())
        && (moment(date1).month() === moment(date2).month())
        && (moment(date1).year() === moment(date2).year());
  }
}
