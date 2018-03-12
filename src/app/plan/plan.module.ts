import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';

import { PlanComponent } from './plan.component';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

import { PlanRoutingModule } from './plan-routing.module';
import { planReducer } from './plan.reducer';
import { CurrentPlanComponent } from './current-plan/current-plan.component';
import { EditPlanComponent } from './edit-plan/edit-plan.component';
import { EditMarkerCardComponent } from './edit-plan/edit-marker-card/edit-marker-card.component';

@NgModule({
  declarations: [
    PlanComponent,
    CurrentPlanComponent,
    EditPlanComponent,
    EditMarkerCardComponent
  ],
  imports: [
    SharedModule,
    PlanRoutingModule,
    StoreModule.forFeature('plan', planReducer)
  ]
})
export class PlanModule {}
