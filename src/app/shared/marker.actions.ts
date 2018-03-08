import { Marker } from './marker.model';
import { Action } from '@ngrx/store';

export const SET_AVAILABLE_MARKERS = '[Marker] Set Available Markers';


export class SetAvailableMarkers implements Action {
  readonly type = SET_AVAILABLE_MARKERS;

  constructor(public payload: Marker[]) {}
}

export type MarkerActions =
  | SetAvailableMarkers;
