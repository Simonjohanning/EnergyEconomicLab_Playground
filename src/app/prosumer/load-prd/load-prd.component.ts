import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Load} from '../../core/data-types/Load';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-load-prd',
  templateUrl: './load-prd.component.html',
  styleUrls: ['./load-prd.component.css']
})
export class LoadPRDComponent implements OnInit, AfterViewInit {

  @Input() resource: Load;
  private showResource = true;
  @ViewChild('canvas') canvas: ElementRef;
  private loadChart: Chart;
  private labels;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.loadGraph();
  }

  loadGraph(): void {
    //TODO fix reload panel issue
    this.labels = this.resource.loadProfile.map(currentValue => ('t = ' + this.resource.loadProfile.indexOf(currentValue)));
    this.loadChart = new Chart((this.canvas.nativeElement as HTMLCanvasElement).getContext('2d'), {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'scheduled load',
          data: this.resource.loadProfile
        }]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'time step'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'power consumption (kW)'
            }
          }]
        },
        labelString: 'Power consumption of resource'
      }
    });
    this.cd.detectChanges();
  }

  updatePanel(): void {
    this.showResource = !this.showResource;
    if (this.showResource) { this.loadGraph(); }
  }
}
