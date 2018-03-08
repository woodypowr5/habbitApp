import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Marker } from '../shared/marker.model';
import { Plan } from './plan.model';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as PlanActions from './plan.actions';
import * as fromPlan from './plan.reducer';

@Injectable()
export class PlanService {
  private markerSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromPlan.State>
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
          (markers: Marker[]]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableMarkers(markers));
          },
          error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackbar(
              'Fetching Exercises failed, please try again later',
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

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
