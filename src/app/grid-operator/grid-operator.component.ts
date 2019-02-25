import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {DataProvisionService} from '../core/data-provision.service';

@Component({
  selector: 'app-grid-operator',
  templateUrl: './grid-operator.component.html',
  styleUrls: ['./grid-operator.component.css']
})
export class GridOperatorComponent implements OnInit {

  private experimentId: number;

  constructor(
    private data: DataProvisionService) { }

  ngOnInit() {
    this.experimentId = this.data.experimentId;
  }

}
