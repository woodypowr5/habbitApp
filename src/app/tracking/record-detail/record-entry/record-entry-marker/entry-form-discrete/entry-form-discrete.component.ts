import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entry-form-discrete',
  templateUrl: './entry-form-discrete.component.html',
  styleUrls: ['./entry-form-discrete.component.css']
})
export class EntryFormDiscreteComponent implements OnInit {
  @Input() min: number;
  @Input() max: number;
  @Input() delta: number;
  @Input() unit: string;
  @Input() minLabel: string;
  @Input() maxLabel: string;

  constructor() { }

  ngOnInit() {
  }

}
