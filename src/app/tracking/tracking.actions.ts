import { Measurement } from './measurement.model';
import { History } from './history.model';
import { Action } from '@ngrx/store';
import { Record } from './record.model';


export const SET_RECORD = '[Tracking] Set Record';
export const MODIFY_RECORD = '[Tracking] Modify Record';
export const DELETE_RECORD = '[Tracking] Delete Record';
export const SET_HISTORY = '[Tracking] Set History';

export class SetRecord implements Action {
  readonly type = SET_RECORD;

  constructor(public payload: Record) {}
}

export class ModifyRecord implements Action {
  readonly type = MODIFY_RECORD;

  constructor(public payload: Record) {}
}

export class DeleteRecord implements Action {
  readonly type = DELETE_RECORD;

  constructor(public payload: Record) {}
}

export class SetHistory implements Action {
  readonly type = SET_HISTORY;
  constructor(public payload: History) {
    console.log(payload)
  }
}

export type TrackingActions =
  | SetRecord
  | ModifyRecord
  | DeleteRecord
  | SetHistory;


