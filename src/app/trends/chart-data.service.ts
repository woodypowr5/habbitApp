import { Datapoint } from './../shared/types/datapoint.model';
import { Measurement } from './../shared/types/measurement.model';
import { Record } from './../shared/types/record.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ChartDataService {

  constructor() { }

  formatToDatapoints(records: Record[], includeMarkers: [string, string], dateRange: [Date, Date]): Datapoint[] {
    const datapoints: Datapoint[] = [];
    records.map(record => {
      const newDatapoint: Datapoint = {
        x: this.getMeasurementValueFromRecord(record, includeMarkers[0]),
        y: this.getMeasurementValueFromRecord(record, includeMarkers[1])
      };
      if (newDatapoint.x !== null && newDatapoint.y !== null) {
        datapoints.push(newDatapoint);
      }
    });
    return datapoints;
  }

  getMeasurementValueFromRecord(record: Record, markerName: string): number {
    for (let i = 0; i < record.measurements.length; i++) {
      if (record.measurements[i].markerName === markerName) {
        return record.measurements[i].value;
      }
    }
    return null;
  }
}

