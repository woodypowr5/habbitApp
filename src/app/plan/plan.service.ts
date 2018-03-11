import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/observable';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Plan } from './plan.model';
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
              name: doc.payload.doc.data().name
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

  private addDataToDatabase(plan: Plan) {
    this.db.collection('plans').add(plan);
  }
}
