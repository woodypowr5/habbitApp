import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-record-entry-marker',
  templateUrl: './record-entry-marker.component.html',
  styleUrls: ['./record-entry-marker.component.css']
})
export class RecordEntryMarkerComponent implements OnInit {
  @Input() marker;
  @Input() measurement;

  constructor() { }

  ngOnInit() {
  }

}
