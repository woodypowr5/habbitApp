import { Plan } from './plan.model';
import { Marker } from '../shared/marker.model';

import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  PlanActions,
  SET_PLAN
} from './plan.actions';

import * as fromRoot from '../app.reducer';

export interface PlanState {
  plan: Plan;
}

export interface State extends fromRoot.State {
  plan: PlanState;
}

const initialState: PlanState = {
  plan: null
};

export function planReducer(state = initialState, action: PlanActions) {
  switch (action.type) {
    case SET_PLAN:
      return {
        ...state,
        plan: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getPlanState = createFeatureSelector<PlanState>('plan');

export const getPlan = createSelector(getPlanState, (state: PlanState) => state.plan);
