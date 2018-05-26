import { AdjustedDatePipe } from './../adjustedDate.pipe';
import { TrackingDay } from './../../trackingDay.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Record } from '../../record.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input() isRecord;
  @Input() record;
  @Input() index;
  @Input() date;
  @Output() newActiveRecord: EventEmitter<TrackingDay> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  setActiveDate(record: Record, index: number, date: Date) {
    console.log(record)
    const today: TrackingDay = {
      id: record.id,
      date: date,
      record: {
        id: null,
        date: null,
        measurements: []
      }
    };
    if (record) {
      today.record = record;
    }
    this.newActiveRecord.emit(today);
  }

  recordExistsForDay() {
    if (this.record) {
      return (this.record.measurements.length > 0);
    }
    return false;
  }
}
