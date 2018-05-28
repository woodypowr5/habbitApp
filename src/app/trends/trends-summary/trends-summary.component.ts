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
  private datapoints: Datapoint[] = [];
  constructor(private chartDataService: ChartDataService) {}

  // get datapoints(): Datapoint[] { // this may be too slow
  //   return this.chartDataService.formatToDatapoints(this.records, this.includeMarkers, this.dateRange);
  // }

  ngOnInit() {
    this.datapoints =  this.formatData(
      this.records,
      [
        this.includeMarkers[0],
        this.includeMarkers[1]
      ],
      [
        this.dateRange[0],
        this.dateRange[1]
      ]
    );
  }

  formatData(records: Record[], includeMarkers: [string, string], dateRange: [Date, Date]): Datapoint[] {
    return this.chartDataService.formatToDatapoints(records, includeMarkers, dateRange);
  }

}
