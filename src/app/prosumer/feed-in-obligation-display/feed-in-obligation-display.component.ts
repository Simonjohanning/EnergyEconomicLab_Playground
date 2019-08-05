import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {forEach} from '@angular/router/src/utils/collection';
import {ExperimentInstance} from '../../core/data-types/ExperimentInstance';
import {ExperimentInstanceLoaderService} from '../../core/experiment-instance-loader.service';
import {Prosumer} from '../../core/data-types/Prosumer';
import {DataProvisionService} from '../../core/data-provision.service';

@Component({
  selector: 'app-feed-in-obligation-display',
  templateUrl: './feed-in-obligation-display.component.html',
  styleUrls: ['./feed-in-obligation-display.component.css']
})
export class FeedInObligationDisplayComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;
  @Input() prosumer: Prosumer;
  private obligationPlot: Chart;
  private obligationSeries: number[];
  constructor(private bts: BlockchainTransactionService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.calculateObligation();
  }

  ngAfterInit() {
    this.loadGraph();
  }

  loadGraph(): void {
    this.obligationPlot = new Chart((this.canvas.nativeElement as HTMLCanvasElement).getContext('2d'), {
      type: 'line',
      data: {
        labels: Array.from(Array(this.obligationSeries.length).keys()),
        datasets: [{
          label: 'projected generation',
          data: this.obligationSeries
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

  private calculateObligation(): void {
    const simulationLength = DataProvisionService.getExperimentLength().subscribe(noElements => {
      this.obligationSeries = new Array(noElements);
    });
    this.bts.committedBidSubject.subscribe(commitedBid => {
      if (commitedBid.provider === this.prosumer) {
        let i: number;
        for (i = 0; i < commitedBid.duration; i++) {
          this.obligationSeries[commitedBid.deliveryTime + i] += commitedBid.power;
        }
      }
    });
  }
}
