import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { TrackingComponent } from './tracking.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { TrackingRoutingModule } from './tracking-routing.module';
import { trackingReducer } from './tracking.reducer';

@NgModule({
  declarations: [
    TrackingComponent,
  ],
  imports: [
    SharedModule,
    TrackingRoutingModule,
    StoreModule.forFeature('tracking', trackingReducer)
  ]
})
export class TrackingModule {}
