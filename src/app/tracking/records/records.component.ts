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

  constructor() { }

  ngOnInit() {

  }

  setActiveRecord($event) {
    console.log($event);
    this.setNewActiveRecord.emit($event);
  }

}
