import { Measurement } from './measurement.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { Record } from './record.model';
import { History } from './history.model';
import { UserData } from './../auth/userData.model';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material';


@Injectable()
export class TrackingService {
  private userId: string = null;
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
    this.userId = userId;
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

  addRecordtoHistory(record) {
    const historyRef = this.db.collection('histories').doc(this.userId).collection('records');
    const oldHistory = this.history;
    let newRecord = {
          record
    };
    console.log(newRecord)
    historyRef.add(newRecord);
  }
}
