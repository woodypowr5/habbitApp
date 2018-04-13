import { History } from './history.model';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  TrackingActions,
  SET_RECORD,
  MODIFY_RECORD,
  DELETE_RECORD,
  SET_HISTORY
} from './tracking.actions';
import * as fromRoot from '../app.reducer';

export interface TrackingState {
  history: History;
}

export interface State extends fromRoot.State {
  tracking: TrackingState;
}

const initialState: TrackingState = {
 history: {
   records: [],
 }
};

export function trackingReducer(state = initialState, action: TrackingActions) {
  console.log(state)
  console.log(action)
  switch (action.type) {
    case SET_RECORD:
      return {
        ...state,
        record: action.payload
      };
    case MODIFY_RECORD:
      return {
        ...state,
        record: action.payload
    };
    case SET_RECORD:
      return {
        ...state,
        plan: action.payload
    };
    case SET_HISTORY:
      return {
        history: action.payload
    };
    default: {
      return state;
    }
  }
}

export const getTrackingState = createFeatureSelector<TrackingState>('tracking');

export const getHistory = createSelector(getTrackingState, (state: TrackingState) => state.history);
