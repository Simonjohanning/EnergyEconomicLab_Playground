import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {DataProvisionService} from '../core/data-provision.service';

@Component({
  selector: 'app-public-actor',
  templateUrl: './public-actor.component.html',
  styleUrls: ['./public-actor.component.css']
})
export class PublicActorComponent implements OnInit {
  private experimentId: number;
  constructor(
    private data: DataProvisionService) { }

  ngOnInit() {
    this.experimentId = this.data.experimentId;
  }

}
