import { Record } from './../record.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  @Input() records;
  @Output() setNewActiveRecord: EventEmitter<Record> = new EventEmitter();
  private activeRecordIndex = 2;

  constructor() { }

  ngOnInit() {
    console.log(this.records);
  }

  setActiveRecord(event, index) {
    this.setNewActiveRecord.emit(event);
    this.activeRecordIndex = index;
  }

}
