import { ChartDataService } from './../chart-data.service';
import { Record } from './../../tracking/record.model';
import { Datapoint } from './../datapoint.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trends-summary',
  templateUrl: './trends-summary.component.html',
  styleUrls: ['./trends-summary.component.css']
})
export class TrendsSummaryComponent implements OnInit {
  @Input() records: Record[];
  // private datapoints: Datapoint[] = [];
  private dateRange: [Date, Date] = [null, null];
  private includeMarkers: [string, string] = ['Overall Mood', 'Diet Quality'];

  constructor(private chartDataService: ChartDataService) {}

  get datapoints(): Datapoint[] { // this may be too slow
    return this.chartDataService.formatToDatapoints(this.records, this.includeMarkers, this.dateRange);
  }

  ngOnInit() {}

}
