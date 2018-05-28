import { ChartDataService } from './../chart-data.service';
import { Record } from './../../tracking/record.model';
import { Datapoint } from './../datapoint.model';
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
  public context: CanvasRenderingContext2D;
  @Input() records: Record[];
  private dateRange: [Date, Date] = [null, null];
  private includeMarkers: [string, string] = ['Overall Mood', 'Diet Quality'];
  private datapoints: Datapoint[] = [];
  chart: any = [];
  // canvas: any;
  constructor(private chartDataService: ChartDataService, private el: ElementRef, private renderer: Renderer) {
    this.canvas = el.nativeElement.children;
    console.log(this.canvas[0]);
  }
  // get datapoints(): Datapoint[] { // this may be too slow
  //   return this.chartDataService.formatToDatapoints(this.records, this.includeMarkers, this.dateRange);
  // }

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
    this.context = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');
    console.log(this.context);
    this.chart =  new Chart('canvas', {
      type: 'scatter',
      data: {
          datasets: [{
              label: 'Scatter Dataset',
              data: this.chartDataService.formatToDatapoints(this.records, this.includeMarkers, this.dateRange);
      }],
      options: {
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom'
              }]
          }
      }
  });
    // this.chart = new Chart('canvas', {
    //   type: 'scatter',
    //   data: {
    //       datasets: [{
    //           label: 'Scatter Dataset',
    //           data: [{
    //               x: -10,
    //               y: 0
    //           }, {
    //               x: 0,
    //               y: 10
    //           }, {
    //               x: 10,
    //               y: 5
    //           }]
    //       }]
    //   },
    //   options: {
    //       scales: {
    //           xAxes: [{
    //               type: 'linear',
    //               position: 'bottom'
    //           }]
    //       }
    //   }
    // });
  }

  formatData(records: Record[], includeMarkers: [string, string], dateRange: [Date, Date]): Datapoint[] {
    return this.chartDataService.formatToDatapoints(records, includeMarkers, dateRange);
  }

  createChart(context: any) {
    this.chart = new scatterChart.ScatterChart;
    this.chart.createChart(this.context);
  }



}
