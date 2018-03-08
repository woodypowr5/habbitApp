import { Marker } from './marker.model';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import {
  MarkerActions,
  SET_AVAILABLE_MARKERS
} from './marker.actions';

import * as fromRoot from '../app.reducer';

export interface MarkerState {
  availableMarkers: Marker[];
}

export interface State extends fromRoot.State {
    marker: MarkerState;
}

const initialState: MarkerState = {
  availableMarkers: []
};

export function markerReducer(state = initialState, action: MarkerActions) {
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

export const getPlanState = createFeatureSelector<MarkerState>('marker');

export const getAvailableMarkers = createSelector(getPlanState, (state: MarkerState) => state.availableMarkers);
