import { Plan } from './../../plan/plan.model';
import { Datapoint } from './../../shared/types/datapoint.model';
import { Record } from './../../shared/types/record.model';
import { ChartDataService } from './../chart-data.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trends-summary',
  templateUrl: './trends-summary.component.html',
  styleUrls: ['./trends-summary.component.css']
})
export class TrendsSummaryComponent implements OnInit {
  @Input() records: Record[];
  @Input() plan: Plan;
  private dateRange: [Date, Date] = [null, null];
  private includeMarkers: [string, string] = ['Overall Mood', 'Diet Quality'];
  private seriesData;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit() {
    this.seriesData = this.chartDataService.createSeriesData(this.records, this.plan);
  }

}
