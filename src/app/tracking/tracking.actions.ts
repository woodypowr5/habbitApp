import { Action } from '@ngrx/store';

export const SET_AVAILABLE_TRACKINGS = '[Tracking] Set Available Trackings';
export const SET_FINISHED_TRACKINGS = '[Tracking] Set Finished Trackings';
export const START_TRACKING = '[Tracking] Start Tracking';
export const STOP_TRACKING = '[Tracking] Stop Tracking';

export class SetAvailableTrackings implements Action {
  readonly type = SET_AVAILABLE_TRACKINGS;

  constructor(public payload: any) {}
}

export class SetFinishedTrackings implements Action {
  readonly type = SET_FINISHED_TRACKINGS;

  constructor(public payload: any) {}
}

export class StartTracking implements Action {
  readonly type = START_TRACKING;

  constructor(public payload: string) {}
}

export class StopTracking implements Action {
  readonly type = STOP_TRACKING;
}

export type TrackingActions =
  | SetAvailableTrackings
  | SetFinishedTrackings
  | StartTracking
  | StopTracking;
