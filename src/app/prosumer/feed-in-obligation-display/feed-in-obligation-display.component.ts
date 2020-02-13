import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BlockchainTransactionService } from '../../core/blockchain-transaction.service';
import { DataProvisionService } from '../../core/data-provision.service';
import { ProsumerInstance } from '../../core/data-types/ProsumerInstance';
import { Observable } from 'rxjs';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-feed-in-obligation-display',
  templateUrl: './feed-in-obligation-display.component.html',
  styleUrls: ['./feed-in-obligation-display.component.css']
})

/**
 * Component to display the contractual obligations of the respective prosumer for feeding electricity into the grid.
 * Manages the data relevant for diplaying the respective plot
 */
export class FeedInObligationDisplayComponent implements OnInit {
  /** The element reference for the canvas element used in the view of the component */
  @ViewChild('canvas') canvas: ElementRef;
  /** The observable for deriving the prosumer instance of the component */
  @Input() piObservable: Observable<ProsumerInstance>;
  /** The prosumer instance for which to display the feed-in obligation */
  private prosumer: ProsumerInstance;
  /** The respective chart element to display data in */
  private obligationPlot: Chart;
  /** Array to store a time series of the obligation for feeding in (net) electricity into the grid for each time step / time slice */
  private obligationSeries: number[];
  /** Variable to contain the next feed-in obligation of the prosumer */
  private nextFIT: number;
  constructor(private bts: BlockchainTransactionService,
              private cd: ChangeDetectorRef,
              private timeService: TimeService) { }

  ngOnInit() {
    this.piObservable.subscribe(derivedInstance => {
      this.prosumer = derivedInstance;
    });
    DataProvisionService.getExperimentLength().subscribe(noElements => {
      this.obligationSeries = new Array(noElements);
    });
    this.bts.committedBidSubject.subscribe(commitedBid => {
      if (commitedBid.provider === this.prosumer) {
        // add the committed power delivery to each time slice that concern this committment
        let i: number;
        for (i = 0; i < commitedBid.duration; i++) {
          this.obligationSeries[commitedBid.deliveryTime + i] += commitedBid.power;
        }
      }
    });
    this.timeService.timeEmitter.subscribe(simulationTime => {
      this.nextFIT = this.obligationSeries[Math.ceil(simulationTime)];
    });
  }

  ngAfterInit() {
    this.loadGraph();
  }

  // TODO include a cd listener that updates the nextFIT based on the progress of time based on the respective TimeService

  /**
   * Method to load the graph / chart as a HTMLCanvasELement
   * Specifies the parameters for displaying the respective time series to display and triggers the change detection after setting up the graph
   */
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
}
