import { Marker } from './../../../../../shared/marker.model';
import { Measurement } from './../../../../measurement.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-entry-form-range',
  templateUrl: './entry-form-range.component.html',
  styleUrls: ['./entry-form-range.component.css']
})
export class EntryFormRangeComponent implements OnInit {
  @Input() initialValue: number;
  @Input() marker: Marker;
  @Output() saveMeasurement: EventEmitter<Measurement> = new EventEmitter();
  sliderValue: number;
  constructor() { }

  ngOnInit() {
    this.sliderValue = this.initialValue;
  }

  getStepPercentage(min: number, max: number, step: number) {
    if (step !== undefined) {
      return step / (max - min) * 100;
    }
    return undefined;
  }

  save() {
    const newMeasurement: Measurement = {
      markerName: this.marker.name,
      value: this.sliderValue
    };
    this.saveMeasurement.emit(newMeasurement);
  }

  clear(sliderRef: any) {
    sliderRef.writeValue(0);
    this.sliderValue = undefined;
  }

  matSliderChange(event) {
    console.loo(event)
  }

  // need to update to greater than angularMaterial v6.0.0 to add value to slider
}
