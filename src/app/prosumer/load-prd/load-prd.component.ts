import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Load} from '../../core/data-types/Load';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-load-prd',
  templateUrl: './load-prd.component.html',
  styleUrls: ['./load-prd.component.css']
})

/**
 * Component to display properties of the load as asset information element
 */
export class LoadPRDComponent implements OnInit, AfterViewInit {
  /** The respective asset to detail in the view */
  @Input() resource: Load;
  /** Toggle variable to toggle the view for displaying information */
  private showResource = true;
  /** The element ref element that visualizes the information about the time series of the respective load */
  @ViewChild('canvas') canvas: ElementRef;
  /** The chart element that comprises the visualization information used in the canvas for diplaying the load */
  private loadChart: Chart;
  /** variable to store the labels for the chart to display */
  private labels;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.loadGraph();
  }

  /**
   * Method to load the graph for displaying the load curve.
   * Loads and sets the respective information and starts a change detection cycle
   */
  loadGraph(): void {
    // TODO fix reload panel issue
    this.labels = this.resource.scheduledGeneration.map(currentValue => ('t = ' + this.resource.scheduledGeneration.indexOf(currentValue)));
    this.loadChart = new Chart((this.canvas.nativeElement as HTMLCanvasElement).getContext('2d'), {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'scheduled load',
          data: this.resource.scheduledGeneration
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

  // TODO find a smarter way to do this
  /**
   * Method to update the panel by reloading the graph
   */
  updatePanel(): void {
    this.showResource = !this.showResource;
    if (this.showResource) { this.loadGraph(); }
  }
}
