import { DateService } from './../../shared/date.service';
import { Plan } from './../../plan/plan.model';
import { Record } from './../record.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit, OnChanges {
  @Input() record: Record;
  @Input() myPlan: Plan;
  @Input() activeDate: Date;
  private recordEntryActive = false;


  constructor(private dateService: DateService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: any) {
    if (!this.dateService.isSameDate(changes.activeDate.currentValue, changes.activeDate.previousValue)) {
      this.setRecordEntryActive(false);
    }
  }

  setRecordEntryActive(newValue) {
    this.recordEntryActive = newValue;
  }
}
