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
  @Input() record;
  @Input() index;
  @Input() date;
  @Output() newActiveRecord: EventEmitter<TrackingDay> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  setActiveDate(record, index, date) {
    let today: TrackingDay = {
      date: date,
      record: {
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
    // console.log(this.record)
  }
}
