import { Plan } from './../../plan/plan.model';
import { Record } from './../record.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit {
  @Input() record: Record;
  @Input() myPlan: Plan;
  @Input() activeDate: Date;

  constructor() { }

  ngOnInit() {

  }
}
