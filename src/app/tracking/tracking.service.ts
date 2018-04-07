import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Observable } from 'rxjs';
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
  private fbSubs: Subscription[] = [];
  private historySubscriptions: Subscription[] = [];
  history$: Observable<History>;
  items: any;
  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTracking.State>
  ) {
    this.userData$ = this.store.select(fromRoot.getUserData);
    this.history$ = this.store.select(fromTracking.getHistory);
  }

  fetchHistoryByUserId(userId: string) {
    this.db
    .collection(`histories`)
    .doc('QwpGSkfFh0W3ksPjeKieiIAJtsJ2')
    .collection('records')
    .snapshotChanges()
    .map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          records: doc.payload.doc.data()
        };
      });
    })
    .subscribe(
      (records: any) => {
        console.log(records)
        // this.store.dispatch(new HistoryActions.SetPlan(plan[0]));
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
