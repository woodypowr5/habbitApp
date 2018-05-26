import { Marker } from './../../../../shared/marker.model';
import { Measurement } from './../../../measurement.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-record-entry-marker',
  templateUrl: './record-entry-marker.component.html',
  styleUrls: ['./record-entry-marker.component.css']
})
export class RecordEntryMarkerComponent implements OnInit {
  @Input() marker: Marker;
  @Input() measurement: Measurement;
  @Output() saveMeasurement: EventEmitter<Measurement> = new EventEmitter();
  measurementPercentValue: number;

  constructor() { }

  ngOnInit() {
    if (this.measurement) {
      this.measurementPercentValue = this.translateValueToPercentage(this.marker.min, this.marker.max, this.measurement.value);
    }
  }

  translateValueToPercentage(min: number, max: number, sliderValue: number) : number {
    return ((sliderValue - 1) / (max - min)) * 100;
  }

  translatePercentageToValue(min: number, max: number, percentage: number) : number {
    return (percentage * (max - min) / 100) + min;
  }

  saveNewMeasurement(measurement: Measurement) {
    if (measurement.value !== undefined) {
      measurement.value = this.translatePercentageToValue(this.marker.min, this.marker.max, measurement.value);
    } else {
      measurement.value = undefined;
    }
    this.saveMeasurement.emit(measurement);
  }
}
