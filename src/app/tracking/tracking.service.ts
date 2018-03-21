
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UIService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Tracking from './tracking.actions';
import * as fromTracking from './tracking.reducer';

@Injectable()
export class TrackingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTracking.State>
  ) {}
}
