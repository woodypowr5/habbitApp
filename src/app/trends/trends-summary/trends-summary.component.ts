import { Datapoint } from './../../shared/types/datapoint.model';
import { Record } from './../../shared/types/record.model';
import { ChartDataService } from './../chart-data.service';
import { Component, ViewChild , Directive, ElementRef, HostListener, Input, Renderer, Output, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as scatterChart from './scatter.chart';


@Component({
  selector: 'app-trends-summary',
  templateUrl: './trends-summary.component.html',
  styleUrls: ['./trends-summary.component.css']
})
export class TrendsSummaryComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas: ElementRef;
  @Input() records: Record[];
  public context: CanvasRenderingContext2D;
  private dateRange: [Date, Date] = [null, null];
  private includeMarkers: [string, string] = ['Overall Mood', 'Diet Quality'];
  private datapoints: Datapoint[] = [];
  private chart: any = [];

  constructor(private chartDataService: ChartDataService, private el: ElementRef, private renderer: Renderer) {
    this.canvas = el.nativeElement.children;
  }

  ngOnInit() {
    Chart.defaults.global.elements.point.radius = 10;
    Chart.defaults.global.elements.point.backgroundColor	= 'red';
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

  ngAfterViewInit(): void {
    const chart =  new scatterChart.ScatterChart;
    const data = this.chartDataService.formatToDatapoints(this.records, this.includeMarkers, this.dateRange);
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    this.chart =  new Chart(this.context, chart.getChartData(data));
  }

  formatData(records: Record[], includeMarkers: [string, string], dateRange: [Date, Date]): Datapoint[] {
    return this.chartDataService.formatToDatapoints(records, includeMarkers, dateRange);
  }
}
