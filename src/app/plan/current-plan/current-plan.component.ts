import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Plan } from './../plan.model';
import { Observable } from 'rxjs/observable';
import { PlanService } from './../plan.service';
import * as fromPlan from '../plan.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-current-plan',
  templateUrl: './current-plan.component.html',
  styleUrls: ['./current-plan.component.css']
})
export class CurrentPlanComponent implements OnInit {
  private myPlan$: Observable<Plan>;

  constructor(
    private planService: PlanService,
    private store: Store<fromPlan.State>
  ) { }

  ngOnInit() {
   this.fetchMyPlan();
  }

  fetchMyPlan() {
    this.myPlan$ = this.store.select(fromPlan.getMyPlan);
  }

}
