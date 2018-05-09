import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entry-form-range',
  templateUrl: './entry-form-range.component.html',
  styleUrls: ['./entry-form-range.component.css']
})
export class EntryFormRangeComponent implements OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() delta: number;
  @Input() unit: string;
  @Input() minLabel: string;
  @Input() maxLabel: string;
  @Input() initialValue: number;

  constructor() { }

  ngOnInit() {}

  getStepPercentage(min: number, max: number, step: number) {
    if (step !== undefined) {
      return step / (max - min) * 100;
    }
    return undefined;
  }

  // need to update to greater than angularMaterial v6.0.0 to add value to slider
  

}
