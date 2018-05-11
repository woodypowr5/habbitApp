import { Measurement } from './../../measurement.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-record-entry',
  templateUrl: './record-entry.component.html',
  styleUrls: ['./record-entry.component.css']
})
export class RecordEntryComponent implements OnInit {
  @Input() record;
  @Input() myPlan;
  @Input() activeDate;
  measurements: Measurement[] = [];

  constructor() { }

  ngOnInit() {
    if (this.record) {
      this.measurements = this.getMeasurementsForMarkers();
    }
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

  addOrModifyMeasurement(measurement) {
    console.log(measurement)
    if (measurement.value === undefined) {
      this.deleteMeasurement(measurement.markerName);
    }
  }

  deleteMeasurement(markerName) {
    console.log(this.record.measurements);
    this.record.measurements.filter(measurement => measurement.markerName !== markerName);
    console.log(this.record.measurements);
  }
}
