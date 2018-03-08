import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Plan } from './plan.model';
import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as PlanActions from './plan.actions';
import * as fromPlan from './plan.reducer';

@Injectable()
export class PlanService {
  private planSubscriptions: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromPlan.State>
  ) {}

  fetchPlan() {
    // this.store.dispatch(new UI.StartLoading());
    this.planSubscriptions.push(
      this.db
        .collection('plans')
        .snapshotChanges()
        .map(docArray => {
          // throw(new Error());
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name
            };
          });
        })
        .subscribe(
          (plan: Plan[]) => {
            // this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new PlanActions.SetPlan(plan[0]));
          },
          error => {
            // this.store.dispatch(new UI.StopLoading());
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

  private addDataToDatabase(plan: Plan) {
    this.db.collection('plans').add(plan);
  }
}
