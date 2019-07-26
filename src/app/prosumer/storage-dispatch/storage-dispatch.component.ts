import {Component, Input, OnInit} from '@angular/core';
import {StorageUnit} from '../../core/data-types/StorageUnit';
import {TimeService} from '../../core/time.service';

@Component({
  selector: 'app-storage-dispatch',
  templateUrl: './storage-dispatch.component.html',
  styleUrls: ['./storage-dispatch.component.css']
})
export class StorageDispatchComponent implements OnInit {

  @Input() asset: StorageUnit;
  @Input() timeService: TimeService;

  constructor() { }

  ngOnInit() {
  }

}
