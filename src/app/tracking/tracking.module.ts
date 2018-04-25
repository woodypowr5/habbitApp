import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { TrackingComponent } from './tracking.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { TrackingRoutingModule } from './tracking-routing.module';
import { RecordsComponent } from './records/records.component';
import { RecordComponent } from './records/record/record.component';
import { RecordDetailComponent } from './record-detail/record-detail.component';

@NgModule({
  declarations: [
    TrackingComponent,
    RecordsComponent,
    RecordComponent,
    RecordDetailComponent
  ],
  imports: [
    SharedModule,
    TrackingRoutingModule
  ]
})
export class TrackingModule {}
