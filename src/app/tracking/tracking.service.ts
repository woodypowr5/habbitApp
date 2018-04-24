import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as TrackingActions from './tracking.actions';
import * as fromTracking from './tracking.reducer';

import { Record } from './record.model';
import { History } from './history.model';
import { UserData } from './../auth/userData.model';


@Injectable()
export class TrackingService {
  userData$: Observable<UserData>;
  historyChanged = new Subject<History>();
  private fbSubs: Subscription[] = [];
  private historySubscriptions: Subscription[] = [];
  private history: History = {
    records: []
  };
  
  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTracking.State>
  ) {
    this.userData$ = this.store.select(fromRoot.getUserData);
  }

  fetchHistoryByUserId(userId: string) {
    this.db
    .collection(`histories`)
    .doc(userId)
    .collection('records')
    .valueChanges()
    .map(docArray => {
      return docArray
    })
    .subscribe(
      (historyData: Record[]) => {
        this.history = {
          records: historyData
        }
        this.historyChanged.next(this.history)
      },
      error => {
        this.uiService.showSnackbar(
          'Fetching Exercises failed, please try again later',
          null,
          3000
        );
      }
    );
  }
}
