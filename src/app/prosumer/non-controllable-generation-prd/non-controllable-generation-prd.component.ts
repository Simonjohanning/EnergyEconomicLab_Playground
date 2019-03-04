import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NonControllableGenerator} from '../../core/data-types/NonControllableGenerator';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-non-controllable-generation-prd',
  templateUrl: './non-controllable-generation-prd.component.html',
  styleUrls: ['./non-controllable-generation-prd.component.css']
})
export class NonControllableGenerationPRDComponent implements OnInit, AfterViewInit {

  @Input() resource: NonControllableGenerator;
  @ViewChild('canvas') canvas: ElementRef;
  private showResource = true;
  private projectedGenerationChart: Chart;
  private labels;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log(this.resource);
    console.log(this.resource.projectedGeneration);
  }

  ngAfterViewInit(): void {
    this.loadGraph();
  }

  loadGraph(): void {
    //TODO fix reload panel issue
    this.labels = this.resource.projectedGeneration.map(currentValue => ('t = ' + this.resource.projectedGeneration.indexOf(currentValue)));
    this.projectedGenerationChart = new Chart((this.canvas.nativeElement as HTMLCanvasElement).getContext('2d'), {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'projected generation',
          data: this.resource.projectedGeneration
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
              labelString: 'projected generation (kW)'
            }
          }]
        },
        labelString: 'Projected generation of resource'
      }
    });
    this.cd.detectChanges();
  }

  updatePanel(): void {
    this.showResource = !this.showResource;
    if (this.showResource) { this.loadGraph(); }
  }
}
