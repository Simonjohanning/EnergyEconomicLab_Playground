import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ProsumerInstance } from '../../core/data-types/ProsumerInstance';
import { HelperService } from '../../shared/helper.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-residual-load',
  templateUrl: './residual-load.component.html',
  styleUrls: ['./residual-load.component.css']
})

// TODO include storage flexibility potential

/**
 * Component to display the residual time series of the combined assets of the respective prosumer
 * (i.e. the difference between generation and battery discharge and consumption and battery charge).
 * A negative value indicates a net consumption, whereas a positive number indicates a net generation.
 */
export class ResidualLoadComponent implements OnInit, AfterViewInit {
  /** An observable of the respective prosumer instance to display */
  @Input() prosumerObservable: Observable<ProsumerInstance>;
  /** The element ref element that acts as the canvas for the chart */
  @ViewChild('canvas') canvas: ElementRef;
  /** The chart for visualizing the residual load */
  private loadPlot: Chart;
  /** The array containing the time series of the residual load to display */
  private residualLoadSeries = [];
  /** the prosumer instance derived from the provided observable */
  private prosumerInstance: ProsumerInstance;
  constructor(private cd: ChangeDetectorRef,
              private helper: HelperService) { }

  ngOnInit() {
    this.prosumerObservable.subscribe(loadedProsumerInstance => {
      this.prosumerInstance = loadedProsumerInstance;
    });
    this.residualLoadSeries = this.calculateResidualLoad();
  }

  ngAfterViewInit(): void {
    this.loadGraph();
  }

  /**
   * Method to set up the chart data for the residual load chart based on the provided data
   */
  loadGraph(): void {
    this.loadPlot = new Chart((this.canvas.nativeElement as HTMLCanvasElement).getContext('2d'), {
      type: 'line',
      data: {
        labels: Array.from(Array(this.residualLoadSeries.length).keys()),
        datasets: [{
          label: 'projected generation',
          data: this.residualLoadSeries
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
              labelString: 'residual load (kW)'
            }
          }]
        },
        labelString: 'total residual load of assets'
      }
    });
    this.cd.detectChanges();
  }

  // TODO currently only takes into account the non-controllable generators and loads; make dynamic and sensitive to dispatch
  /**
   * Method to calculate the residual load given the respective assets.
   * Aggregates the generation and consumption for the respective assets separately and then calculates the net load for each data point
   *
   * @returns the residual load series as aggregation of the individual generation and consumption of all assets of the respective prosumer instance
   */
  private calculateResidualLoad(): number[] {
    let aggregateGeneration;
    let aggregateLoad;
    if (this.prosumerInstance.nonControllableGenerators[0]) {
      const generatorArrays = [];
      this.prosumerInstance.nonControllableGenerators.forEach(currentNCG => generatorArrays.push(currentNCG.projectedGeneration));
      aggregateGeneration = this.helper.aggregateArrays(generatorArrays);
    } else {
      aggregateGeneration = Array(this.prosumerInstance.loads[0].scheduledGeneration.length).fill(0);
    }
    if (this.prosumerInstance.loads[0]) {
      const loadArrays = [];
      this.prosumerInstance.loads.forEach(currentLoad => loadArrays.push(currentLoad.scheduledGeneration));
      aggregateLoad = this.helper.aggregateArrays(loadArrays);
    } else {
      aggregateLoad = Array(this.prosumerInstance.nonControllableGenerators[0].projectedGeneration.length).fill(0);
    }
    const invertedLoad = aggregateLoad.map(currentLoad => (-1) * currentLoad);
    return this.helper.aggregateArrays([aggregateGeneration, invertedLoad]);
  }
}
