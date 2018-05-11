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

  ngOnInit() {}

  ngOnChanges(changes: any) {
    if (!this.dateService.isSameDate(changes.activeDate.currentValue, changes.activeDate.previousValue)) {
      this.setRecordEntryActive(false);
    }
  }

  setRecordEntryActive(newValue) {
    this.recordEntryActive = newValue;
  }

  addOrModifyMeasurement(measurement: Measurement) {
    console.log(measurement);
    let newRecord: Record = this.record;
    if (measurement.value === undefined) {
      newRecord.measurements = this.deleteMeasurement(newRecord.measurements, measurement.markerName);
    } else if (newRecord.measurements.length === 0) {
      newRecord.measurements.push(measurement);
    } else {
      for (let i = 0; i < this.myPlan.markers.length; i++) {
        console.log(this.myPlan.markers[i].name);
        console.log(measurement.markerName);
        if (this.myPlan.markers[i].name === measurement.markerName) {
          console.log("found 1");
          for (let j = 0; j < newRecord.measurements.length; j++) {
            if (newRecord.measurements[j].markerName === measurement.markerName) {
              console.log("found 2");
              newRecord.measurements[j] = measurement;
              break;
            }
          }
          break;
        }
      }
    }
    this.updateRecord(newRecord);
  }

  deleteMeasurement(measurements, markerName: string) {
    return measurements.filter(function (measurement) {
      return measurement.markerName !== markerName;
    });
  }

  updateRecord(record: Record) {
    this.trackingService.updateRecord(record);
  }
}
