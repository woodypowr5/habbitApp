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
  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTracking.State>
  ) {
    this.userData$ = this.store.select(fromRoot.getUserData);
    this.history$ = this.store.select(fromTracking.getHistory);
  }

  fetchHistoryByUserId(userId: string) {
    this.db.collection('histories').doc(userId).valueChanges().subscribe(action => {
      console.log(action)
    }  
    // this.historySubscriptions.push(
    //   this.db
    //     .collection('histories')
    //     .doc(userId)
    //     .snapshotChanges()
    //     .map(docArray => {
    //       // throw(new Error());
    //       return docArray.map(doc => {
    //         return {
    //           id: doc.payload.doc.id,
    //           name: doc.payload.doc.data().name,
    //           markers: doc.payload.doc.data().markers
    //         };
    //       });
    //     })
    //     .subscribe(
    //       (history: any) => {
    //         console.log(history);
    //         this.store.dispatch(new TrackingActions.SetHistory(history));
    //       },
    //       error => {
    //         this.uiService.showSnackbar(
    //           'Fetching Exercises failed, please try again later',
    //           null,
    //           3000
    //         );
    //       }
    //     )
    // );
  }
}
