import { Component, OnInit } from '@angular/core';
import { TimeService } from '../../core/time.service';
import { DataProvisionService } from '../../core/data-provision.service';

@Component({
  selector: 'app-exogeneous-prices',
  templateUrl: './exogeneous-prices.component.html',
  styleUrls: ['./exogeneous-prices.component.css']
})
export class ExogeneousPricesComponent implements OnInit {

  /** Variable to hold the gas price of the simulation at the respective simulation time */
  private currentGasPrice: number;
  /** Variable to hold the carbon price of the simulation at the respective simulation time */
  private currentCarbonPrice: number;
  /** Variable to hold the time series of the gas price of the simulation */
  private gasPriceSeries: number[];
  /** Variable to hold the time series of the carbon price of the simulation */
  private carbonPriceSeries: number[];

  constructor(private timeService: TimeService
  ) {
    timeService.timeEmitter.subscribe(currentTime => {
      if (this.carbonPriceSeries[currentTime]) {
        this.currentCarbonPrice = this.carbonPriceSeries[currentTime];
      } else {
        this.currentCarbonPrice = null;
      }
      if (this.gasPriceSeries[currentTime]) {
        this.currentGasPrice = this.gasPriceSeries[currentTime];
      } else {
        this.currentGasPrice = null;
      }
    });
    DataProvisionService.getCO2Price().subscribe(carbonPriceSeries => {
      this.carbonPriceSeries = carbonPriceSeries;
      if (carbonPriceSeries[this.timeService.getCurrentTime()]) {
        this.currentCarbonPrice = carbonPriceSeries[this.timeService.getCurrentTime()];
      } else {
        this.currentCarbonPrice = null;
      }
    });
    DataProvisionService.getGasPrice().subscribe(gasPriceSeries => {
      this.gasPriceSeries = gasPriceSeries;
      if (gasPriceSeries[this.timeService.getCurrentTime()]) {
        this.currentGasPrice = gasPriceSeries[this.timeService.getCurrentTime()];
      } else {
        this.currentGasPrice = null;
      }
    });
  }

  ngOnInit() {
  }
}
