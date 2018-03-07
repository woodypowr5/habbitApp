import { Marker } from './marker.model';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  PlanActions,
  SET_AVAILABLE_MARKERS
} from './plan.actions';

import * as fromRoot from '../app.reducer';

export interface PlanState {
  availableMarkers: Marker[];
}

export interface State extends fromRoot.State {
  training: PlanState;
}

const initialState: PlanState = {
  availableMarkers: []
};

export function planReducer(state = initialState, action: PlanActions) {
  switch (action.type) {
    case SET_AVAILABLE_MARKERS:
      return {
        ...state,
        availableMarkers: action.payload
      };
    default: {
      return state;
    }
  }
}

export const getPlanState = createFeatureSelector<PlanState>('plan');

export const getAvailableMarkers = createSelector(getPlanState, (state: PlanState) => state.availableMarkers);
