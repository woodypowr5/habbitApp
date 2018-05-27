import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { TrendsComponent } from './trends.component';
import { TrendsRoutingModule } from './trends-routing.module';
import { SharedModule } from '../shared/shared.module'; 

@NgModule({
    declarations: [
        TrendsComponent
    ],
    imports: [
        SharedModule,
        TrendsRoutingModule
    ],
    providers: []
})
export class TrendsModule {}
