import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { Record } from './record.model';
import { History } from './history.model';
import { UserData } from './../auth/userData.model';


@Injectable()
export class TrackingService {
  userData$: Observable<UserData>;
  historyChanged = new BehaviorSubject<History>(null);
  private fbSubs: Subscription[] = [];
  private historySubscriptions: Subscription[] = [];
  private history: History = {
    records: []
  };

  constructor(
    private db: AngularFirestore
  ) {}

  fetchHistoryByUserId(userId: string) {
    this.historySubscriptions.push(
      this.db
      .collection(`histories`)
      .doc(userId)
      .collection('records')
      .valueChanges()
      .map(docArray => {
        return docArray;
      })
      .subscribe(
        (historyData: Record[]) => {
          this.history = {
            records: historyData
          };
          this.historyChanged.next(this.history);
        },
        error => {}
      )
    );
  }
}
