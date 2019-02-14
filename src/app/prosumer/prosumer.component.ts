import { Component, OnInit } from '@angular/core';
import {Prosumer} from '../Prosumer';
import { ActivatedRoute} from '@angular/router';
import { Location} from '@angular/common';
import {ExperimentInstanceLoaderService} from '../experiment-instance-loader.service';

@Component({
  selector: 'app-prosumer',
  templateUrl: './prosumer.component.html',
  styleUrls: ['./prosumer.component.css']
})
export class ProsumerComponent implements OnInit {

  private prosumer: Prosumer;

  constructor( private route: ActivatedRoute,
               private loader: ExperimentInstanceLoaderService,
               private location: Location) { }

  ngOnInit() {
    this.getProsumer();
  }

  getProsumer(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loader.getProsumer(id)
      .subscribe(prosumer => this.prosumer = prosumer);
  }

}
