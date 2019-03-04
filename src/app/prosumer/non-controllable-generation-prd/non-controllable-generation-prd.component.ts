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
  public context: CanvasRenderingContext2D;
  private showResource = true;
  private myLineChart: Chart;
  private labels = [0, 1, 2];

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
    this.context = ( <HTMLCanvasElement> this.canvas.nativeElement).getContext('2d');
    this.myLineChart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'projected generation',
          data: [0.5, 1.2, 1.1]
        }],
        xAxisID: 'time step',
        yAxisID: 'projected generation (kW)'
      },
      options: {
        label: 'Projected generation of resource'
      }
    });
    this.cd.detectChanges();
  }

  updatePanel(): void {
    this.showResource = !this.showResource;
    if(this.showResource) { this.loadGraph(); }
  }
}
