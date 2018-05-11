import { TrackingService } from './../tracking.service';
import { Measurement } from './../measurement.model';
import { EmptyPlan } from './../../plan/emptyPlan.class';
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
  @Input() myPlan: Plan = new EmptyPlan;
  @Input() activeDate: Date;
  private recordEntryActive = false;

  constructor(private dateService: DateService, private trackingService: TrackingService) { }

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

  addOrModifyMeasurement(measurement) {
    this.trackingService.addOrModifyMeasurement(measurement);
  }
}
