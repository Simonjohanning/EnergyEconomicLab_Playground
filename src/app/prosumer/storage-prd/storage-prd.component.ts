import {Component, Input, OnInit} from '@angular/core';
import {StorageUnit} from '../../core/data-types/StorageUnit';
import {TimeService} from '../../core/time.service';

@Component({
  selector: 'app-storage-prd',
  templateUrl: './storage-prd.component.html',
  styleUrls: ['./storage-prd.component.css']
})
export class StoragePRDComponent implements OnInit {

  @Input() resource: StorageUnit;
  private showResource = true;
  public currentSOC: number;

  constructor(
    private timeService: TimeService
  ) { }

  ngOnInit() {
    this.currentSOC = this.resource.storageHistory[0];
    this.timeService.timeEmitter.subscribe(timeUpdate => {
      console.log('Storage ' + this.resource.model + ' receives time update: ' + timeUpdate);
      // could be undefined, but the idea is that if its undefined it will be hidden, so this is intentional
      this.currentSOC = this.resource.storageHistory[timeUpdate];
      console.log('With the update the currentSOC is ' + this.currentSOC + ', since the storage history of the store is ' + this.resource.storageHistory);
    });
  }

}
