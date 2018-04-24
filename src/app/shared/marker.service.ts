import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/subscription';
import { BehaviorSubject } from 'rxjs';

import { Marker } from '../shared/marker.model';

@Injectable()
export class MarkerService {
  availableMarkers: Marker[] = [];
  availableMarkersChanged = new BehaviorSubject<Marker[]>(null);
  private markerSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore
  ) {
    this.fetchAvailableMarkers();
  }

  fetchAvailableMarkers() {
    this.markerSubscriptions.push(
      this.db
        .collection('availableMarkers')
        .snapshotChanges()
        .map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              dataType: doc.payload.doc.data().dataType,
              values: doc.payload.doc.data().values,
              min: doc.payload.doc.data().min,
              max: doc.payload.doc.data().max,
              iconName: doc.payload.doc.data().iconName,
              isLoading: false
            };
          });
        })
        .subscribe(
          (markers: Marker[]) => {
            this.availableMarkers = markers;
            this.availableMarkersChanged.next(this.availableMarkers);
          },
          error => {}
        )
    );
  }

  cancelSubscriptions() {
    this.markerSubscriptions.forEach(sub => sub.unsubscribe());
  }

}
