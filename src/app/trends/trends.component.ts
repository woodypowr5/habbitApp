import { Record } from './../shared/types/record.model';
import { History } from './../shared/types/history.model';
import { Subscription } from 'rxjs/subscription';
import { TrackingService } from './../tracking/tracking.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  private records: Record[];
  private historySubscription: Subscription;

  constructor(private trackingService: TrackingService) {
    this.historySubscription = this.trackingService.historyChanged.subscribe(history => {
      this.records = history.records;
    });
  }

  ngOnInit() {
  }

}
