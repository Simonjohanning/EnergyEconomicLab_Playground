import {Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import { Chart } from 'chart.js';
import {ProsumerInstance} from '../../core/data-types/ProsumerInstance';
import {HelperService} from '../../core/helper.service';

@Component({
  selector: 'app-residual-load',
  templateUrl: './residual-load.component.html',
  styleUrls: ['./residual-load.component.css']
})
export class ResidualLoadComponent implements OnInit, AfterViewInit {

  @Input() prosumerInstance: ProsumerInstance;
  @ViewChild('canvas') canvas: ElementRef;
  private loadPlot: Chart;
  private residualLoadSeries = [];
  constructor(private cd: ChangeDetectorRef,
              private helper: HelperService) { }

  ngOnInit() {
    this.calculateResidualLoad();
  }

  ngAfterViewInit(): void {
    this.loadGraph();
  }

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
  private calculateResidualLoad(): void {
    let aggregateGeneration;
    let aggregateLoad;
    if (this.prosumerInstance.nonControllableGenerators[0]) {
      const generatorArrays = [];
      this.prosumerInstance.nonControllableGenerators.forEach(currentNCG => generatorArrays.push(currentNCG.projectedGeneration));
      aggregateGeneration = this.helper.aggregateArrays(generatorArrays);
    } else {
      aggregateGeneration = Array(this.prosumerInstance.loads[0].loadProfile.length).fill(0);
    }
    if (this.prosumerInstance.loads[0]) {
      const loadArrays = [];
      this.prosumerInstance.loads.forEach(currentLoad => loadArrays.push(currentLoad.loadProfile));
      aggregateLoad = this.helper.aggregateArrays(loadArrays);
    } else {
      aggregateLoad = Array(this.prosumerInstance.nonControllableGenerators[0].projectedGeneration.length).fill(0);
    }
    const invertedLoad = aggregateLoad.map(currentLoad => (-1) * currentLoad);
    this.residualLoadSeries = this.helper.aggregateArrays([aggregateGeneration, invertedLoad]);
  }
}
