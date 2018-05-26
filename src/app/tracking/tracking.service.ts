import { DateService } from './../shared/date.service';
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
  private fbSubs: Subscription[] = [];
  private historySubscriptions: Subscription[] = [];
  private history: History = {
    records: []
  };
  historyChanged = new BehaviorSubject<History>(null);

  constructor(
    private db: AngularFirestore,
    private dateService: DateService
  ) {}

  fetchHistoryByUserId(userId: string) {
    this.userId = userId;
    this.historySubscriptions.push(
      this.db
      .collection(`histories`)
      .doc(userId)
      .collection('records')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          const data = doc.payload.doc.data();
          const id = doc.payload.doc.id;
          return { id, ...data };
        });
      })
      .subscribe(
        (historyData: any) => {
        for (let i = 0; i < historyData.length; i++) {
          historyData[i].id = historyData[i].id;
        }
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
    const historyRef = this.db.collection('histories')
      .doc(this.userId)
      .collection('records');
    const oldHistory = this.history;
    let newRecord = {
          record
    };
    historyRef.add(newRecord);
  }

  updateRecord(record: Record) {
    console.log(record)
    const newHistory = this.history;
    const recordRef = this.db
      .collection('histories')
      .doc(this.userId)
      .collection('records')
      .doc(record.id);
      recordRef.update(record);
  }
}
