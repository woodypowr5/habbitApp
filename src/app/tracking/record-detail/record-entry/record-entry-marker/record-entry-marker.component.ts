import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-record-entry-marker',
  templateUrl: './record-entry-marker.component.html',
  styleUrls: ['./record-entry-marker.component.css']
})
export class RecordEntryMarkerComponent implements OnInit {
  @Input() marker;
  @Input() measurement;
  measurementValue: number;

  constructor() { }

  ngOnInit() {
    if (this.measurement) {
      this.measurementValue = this.translateValueToPercentage(this.marker.min, this.marker.max, this.measurement.value);
    }
  }

  translateValueToPercentage(min: number, max: number, sliderValue: number) {
    return ((sliderValue - 1) / (max - min)) * 100;
  }

}
