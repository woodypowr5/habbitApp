import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs/subscription';
import { Observable } from 'rxjs/observable';
import { BehaviorSubject } from 'rxjs';

import { Plan } from './plan.model';
import { Marker } from './../shared/marker.model';

@Injectable()
export class PlanService {
  private userId: string = null;
  private plan: Plan = {
    name: null,
    markers: []
  };
  planChanged = new BehaviorSubject<Plan>(null);
  private planSubscriptions: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  fetchPlanByUserId(userId: string) {
    this.userId = userId;
    this.planSubscriptions.push(
      this.db
        .collection('plans')
        .valueChanges()
        .map(docArray => {
          return docArray;
        })
        .subscribe(
          (plan: Plan[]) => {
            if (plan.length > 0) {
              this.plan = plan[0];
              if (!plan[0].markers) {
                this.plan.markers = [];
              }
            }
            this.planChanged.next(plan[0]);
          },
          error => {}
        )
    );
  }
 
  cancelSubscriptions() {
    this.planSubscriptions.forEach(sub => sub.unsubscribe());
  }

  addMarkerToPlan(marker) {
    this.modifyPlanInDatabase({
      ...this.plan,
      markers: [...this.plan.markers, marker]
    });
    this.planChanged.next(this.plan);
  }

  removeMarkerFromPlan(marker) {
    this.modifyPlanInDatabase({
      ...this.plan,
      markers: this.plan.markers.filter(currentMarker => currentMarker.id !== marker.id )
    });
    this.planChanged.next(this.plan);
  }

  private addDataToDatabase(newPlan: Plan) {
    this.db.collection('plans').add(newPlan);
  }

  private modifyPlanInDatabase(newPlan: Plan) {
    const planRef = this.db.collection('plans').doc(this.userId);
    const setWithMerge = planRef.set({
      markers: newPlan.markers
    }, { merge: true });
  }
}
