import {Component, Input, OnInit} from '@angular/core';
import {StorageUnit} from '../../core/data-types/StorageUnit';

@Component({
  selector: 'app-storage-prd',
  templateUrl: './storage-prd.component.html',
  styleUrls: ['./storage-prd.component.css']
})
export class StoragePRDComponent implements OnInit {

  @Input() resource: StorageUnit;

  constructor() { }

  ngOnInit() {
  }

}
