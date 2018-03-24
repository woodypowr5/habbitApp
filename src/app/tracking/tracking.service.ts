
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UIService } from '../shared/ui.service';
import * as TrackingActions from './tracking.actions';
import * as fromTracking from './tracking.reducer';

import { Record } from './record.model';
import { History } from './history.model';

@Injectable()
export class TrackingService {
  private fbSubs: Subscription[] = [];
  private historySubscriptions: Subscription[] = [];
  history$: Observable<History>;
  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTracking.State>
  ) {
    this.history$ = this.store.select(fromTracking.getHistory);
  }

  fetchHistory() {
    this.historySubscriptions.push(
      this.db
        .collection('histories')
        .snapshotChanges()
        .map(docArray => {
          // throw(new Error());
          return docArray.map(doc => {
            return {
              userId: doc.payload.doc.data(),
              records: doc.payload.doc.data().records
            };
          });
        })
        .subscribe(
          (history: any) => {
            console.log(history);
            this.store.dispatch(new TrackingActions.SetHistory(history));
          },
          error => {
            this.uiService.showSnackbar(
              'Fetching Exercises failed, please try again later',
              null,
              3000
            );
          }
        )
    );
  }
}
