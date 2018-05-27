import { DateService } from './../../shared/date.service';
import { EmptyRecord } from './../emptyRecord.class';
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
  @Output() setNewActiveDate: EventEmitter<Date> = new EventEmitter();
  private activeRecordIndex = 3;
  private activeDate: Date;
  private activeId: string = null;

  constructor(private dateService: DateService) {}

  ngOnInit() {
    this.setActiveDate(new Date());
  }

  setActiveRecord(event, index): void {
    this.setActiveDate(event.date);
    const newActiveRecord = this.getRecordForDate(event.date);
    if (newActiveRecord) {
      this.setNewActiveRecord.emit(newActiveRecord);
    } else {
      this.setNewActiveRecord.emit(new EmptyRecord);
    }
    this.activeRecordIndex = index;
  }

  setActiveDate(date): void {
    this.activeDate = new Date(date + ', ' + new Date().getFullYear());
    this.setNewActiveDate.emit(this.activeDate);
  }

  getDateByIndex(index): moment.Moment {
    return moment(this.activeDate).add(index - 3, 'days');
  }

  getRecordForDate(date): Record {
    const indexDate = moment(new Date(date + ', ' + new Date().getFullYear()));
    return this.queryRecordsByDate(indexDate);
  }

  getRecordForIndex(index): Record {
    const date = moment(this.activeDate).add(index - 3, 'days');
    const record: Record = this.queryRecordsByDate(date);
    return record;
  }

  queryRecordsByDate(date): Record {
    const record = new EmptyRecord;
    const foundRecord = this.records.filter(currentRecord => {
      if (this.dateService.isSameDate(currentRecord.date, date)) {
          return currentRecord;
      }
    });
    if (foundRecord.length > 0) {
      return foundRecord[0];
    }

    return record;
  }

  setActiveId(id: string): void {
    this.activeId = id;
  }

}
