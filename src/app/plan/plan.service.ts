
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/observable';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Plan } from './plan.model';
import { Marker } from './../shared/marker.model';
import { UserData } from './../auth/userData.model';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as PlanActions from './plan.actions';
import * as fromPlan from './plan.reducer';
import * as fromRoot from '../app.reducer';

@Injectable()
export class PlanService {
  userData$: Observable<UserData>;
  plan$: Observable<Plan>;
  plan: Plan;
  private planSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromPlan.State>
  ) {
    this.userData$ = this.store.select(fromRoot.getUserData);
    this.plan$ = this.store.select(fromPlan.getMyPlan);
  }

  fetchPlanByUserId(userId: string) {
    this.planSubscriptions.push(
      this.db
        .collection('plans')
        .snapshotChanges()
        .map(docArray => {
          // throw(new Error());
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              markers: doc.payload.doc.data().markers
            };
          });
        })
        .subscribe(
          (plan: Plan[]) => {
            this.store.dispatch(new PlanActions.SetPlan(plan[0]));
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

  cancelSubscriptions() {
    this.planSubscriptions.forEach(sub => sub.unsubscribe());
  }

  addMarkerToPlan(marker) {
    let newPlan;
    this.store.select(fromPlan.getMyPlan).pipe(take(1))
      .subscribe(plan => {
        const newMarkers = plan.markers;
        newMarkers.push(marker);
        newPlan = {
          ...plan,
          markers: newMarkers
        };
        this.modifyPlanInDatabase(newPlan);
        this.store.dispatch(new PlanActions.SetPlan(newPlan));
    });
  }

  removeMarkerFromPlan(marker) {
    let newPlan;
    this.store.select(fromPlan.getMyPlan).pipe(take(1))
      .subscribe(plan => {
        newPlan = {
          ...plan,
          markers: plan.markers.filter(currentMarker => currentMarker.id !== marker.id )
        };
        this.modifyPlanInDatabase(newPlan);
        this.store.dispatch(new PlanActions.SetPlan(newPlan));
    });
  }

  private addDataToDatabase(newPlan: Plan) {
    this.db.collection('plans').add(newPlan);
  }

  private modifyPlanInDatabase(newPlan: Plan) {
    const planRef = this.db.collection('plans').doc(newPlan.id);
    const setWithMerge = planRef.set({
      markers: newPlan.markers
    }, { merge: true });
  }
}
