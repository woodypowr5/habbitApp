import { Plan } from './plan.model';
import { Action } from '@ngrx/store';

export const SET_PLAN = '[Plan] Set Plan';

export class SetPlan implements Action {
  readonly type = SET_PLAN;

  constructor(public payload: Plan) {}
}

export type PlanActions =
  | SetPlan;
