import { UIService } from './../../../shared/ui.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ActiveMarkerSettingsComponent } from './active-marker-settings/active-marker-settings.component';

import { Marker } from '../../../shared/marker.model';
import { Plan } from './../../plan.model';

@Component({
  selector: 'app-active-marker-card',
  templateUrl: './active-marker-card.component.html',
  styleUrls: ['./active-marker-card.component.css']
})
export class ActiveMarkerCardComponent implements OnInit, OnChanges {
  @Input() marker: Marker;
  @Input() myPlan: Plan;
  @Input() isInPlan: boolean;
  @Output() markerRemovedFromPlan = new EventEmitter<Marker>();
  isLoading: boolean;
  dialogRef: MatDialogRef<ActiveMarkerSettingsComponent>;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.isLoading = false;
  }

  ngOnChanges() {
    this.isLoading = this.marker.isLoading;
  }

  removeMarkerFromPlan(marker) {
    this.isLoading = true;
    this.markerRemovedFromPlan.emit(marker);
  }

  openDialog() {
    this.dialogRef = this.dialog.open(ActiveMarkerSettingsComponent, {
      data: {
        marker: this.marker,
        myPlan: this.myPlan
      }
    });
  }
}
