import { Plan } from './../../../plan/plan.model';
import { Record } from './../../record.model';
import { map } from 'rxjs/operators';
import { Measurement } from './../../measurement.model';
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-record-entry',
  templateUrl: './record-entry.component.html',
  styleUrls: ['./record-entry.component.css']
})
export class RecordEntryComponent implements OnInit {
  @Input() record: Record;
  @Input() myPlan: Plan;
  @Input() activeDate: Date;
  @Output() addModifyMeasurement: EventEmitter<Measurement> = new EventEmitter();
  measurements: Measurement[] = [];

  constructor() { }

  ngOnInit() {
    if (this.record) {
      this.measurements = this.getMeasurementsForMarkers();
    } // need to re-run this each time record is changed
  } 


  getMeasurementsForMarkers() {
    const measurements: Measurement[] = [];
    for (let i = 0; i < this.myPlan.markers.length; i++) {
      this.record.measurements.filter(currentMeasurement => {
        if (currentMeasurement.markerName === this.myPlan.markers[i].name) {
          measurements[i] = currentMeasurement;
        }
      });
    }
    return measurements;
  }

  addOrModifyMeasurement(measurement: Measurement) {
    this.addModifyMeasurement.emit(measurement);
  }
}
