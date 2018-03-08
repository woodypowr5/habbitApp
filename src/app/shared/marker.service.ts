import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Marker } from '../shared/marker.model';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as MarkerActions from './marker.actions';
import * as fromMarker from './marker.reducer';

@Injectable()
export class MarkerService {
  private markerSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromMarker.State>
  ) {}

  fetchAvailableMarkers() {
    // this.store.dispatch(new UI.StartLoading());
    this.markerSubscriptions.push(
      this.db
        .collection('availableMarkers')
        .snapshotChanges()
        .map(docArray => {
          // throw(new Error());
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              dataType: doc.payload.doc.data().dataType,
              values: doc.payload.doc.data().values,
              min: doc.payload.doc.data().min,
              max: doc.payload.doc.data().max,
              iconName: doc.payload.doc.data().iconName
            };
          });
        })
        .subscribe(
          (markers: Marker[]) => {
            this.store.dispatch(new MarkerActions.SetAvailableMarkers(markers));
          },
          error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
              'Fetching Markers failed, please try again later',
              null,
              3000
            );
          }
        )
    );
  }

  cancelSubscriptions() {
    this.markerSubscriptions.forEach(sub => sub.unsubscribe());
  }

}
