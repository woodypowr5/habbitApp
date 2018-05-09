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

  constructor() { }

  ngOnInit() {}

}
