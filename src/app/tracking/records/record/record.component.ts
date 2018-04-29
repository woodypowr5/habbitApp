import { CalendarDayPipe } from './../../../shared/pipes/calendarDay.pipe';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Record } from '../../record.model';


@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {
  @Input() record;
  @Output() newActiveRecord: EventEmitter<Record> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  setActiveRecord(record) {
    this.newActiveRecord.emit(record);
  }

  recordExistsForDay() {
    return true;
  }
}
