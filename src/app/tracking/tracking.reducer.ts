import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  TrackingActions,
  SET_AVAILABLE_TRACKINGS,
  SET_FINISHED_TRACKINGS,
  START_TRACKING,
  STOP_TRACKING
} from './tracking.actions';
import * as fromRoot from '../app.reducer';

export interface TrackingState {
  name: string;
}

export interface State extends fromRoot.State {
  tracking: TrackingState;
}

const initialState: TrackingState = {
 name: 'hi'
};

export function trackingReducer(state = initialState, action: TrackingActions) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

export const getTrackingState = createFeatureSelector<TrackingState>('tracking');

