import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-entry-form-boolean',
  templateUrl: './entry-form-boolean.component.html',
  styleUrls: ['./entry-form-boolean.component.css']
})
export class EntryFormBooleanComponent implements OnInit {
  @Input() value1Name: string;
  @Input() value2Name: string;

  constructor() { }

  ngOnInit() {
  }

}
