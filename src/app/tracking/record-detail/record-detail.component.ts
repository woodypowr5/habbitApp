import { TrackingService } from './../tracking.service';
import { Measurement } from './../measurement.model';
import { EmptyPlan } from './../../plan/emptyPlan.class';
import { DateService } from './../../shared/date.service';
import { Plan } from './../../plan/plan.model';
import { Record } from './../record.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EmptyRecord } from '../emptyRecord.class';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent implements OnInit {
  @Input() record: Record = new EmptyRecord;
  @Input() myPlan: Plan = new EmptyPlan;
  @Input() activeDate: Date;
  private recordEntryActive = false;

  constructor(private dateService: DateService, private trackingService: TrackingService) { }

  ngOnInit() {}

  setRecordEntryActive(newValue) {
    this.recordEntryActive = newValue;
  }

  addOrModifyMeasurement(measurement: Measurement) { // this needs to be refactored
    let newRecord: Record = this.record; // no id in newRecord ??
    if (measurement.value === undefined) {
      newRecord.measurements = this.deleteMeasurement(newRecord.measurements, measurement.markerName);
    } else if (newRecord.date === null) {
      newRecord = {
        id: 'AAA',
        date: this.activeDate,
        measurements: [measurement]
      };
      newRecord.measurements.push(measurement);
      return this.createRecord(newRecord);
    } else if (newRecord.measurements.length === 0) {
      newRecord.measurements.push(measurement);
    } else {
      for (let i = 0; i < this.myPlan.markers.length; i++) {
        if (this.myPlan.markers[i].name === measurement.markerName) {
          for (let j = 0; j < newRecord.measurements.length; j++) {
            if (newRecord.measurements[j].markerName === measurement.markerName) {
              newRecord.measurements[j] = measurement;
              break;
            }
          }
          break;
        }
      }
    }
    return this.updateRecord(newRecord);
  }

  deleteMeasurement(measurements, markerName: string) {
    return measurements.filter(function (measurement) {
      return measurement.markerName !== markerName;
    });
  }

  updateRecord(record: Record) {
    this.trackingService.updateRecord(record);
  }

  createRecord(record: Record) {
    this.trackingService.addRecordtoHistory(record);
  }

}
