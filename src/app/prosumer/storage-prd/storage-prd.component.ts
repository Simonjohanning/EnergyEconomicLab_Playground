import { Component, Input, OnInit } from '@angular/core';
import { StorageUnit } from '../../core/data-types/StorageUnit';
import { TimeService } from '../../core/time.service';

@Component({
  selector: 'app-storage-prd',
  templateUrl: './storage-prd.component.html',
  styleUrls: ['./storage-prd.component.css']
})

/**
 * Component to display the information for an energy storage unit as persistent resource.
 *
 */
export class StoragePRDComponent implements OnInit {
  /** The respective storage unit to display */
  @Input() resource: StorageUnit;
  /** selection variable whether the display should be shown or hidden */
  private showResource = true;
  /** variable to hold the state of charge of the respective battery */
  public currentSOC: number;

  constructor(
    private timeService: TimeService
  ) { }

  ngOnInit() {
    this.currentSOC = this.resource.scheduledGeneration[0];
    this.timeService.timeEmitter.subscribe(timeUpdate => {
      console.log('Storage ' + this.resource.model + ' receives time update: ' + timeUpdate);
      // TODO check assumption
      // could be undefined, but the idea is that if its undefined it will be hidden, so this is intentional
      this.currentSOC = this.resource.scheduledGeneration[timeUpdate];
    });
  }

}
