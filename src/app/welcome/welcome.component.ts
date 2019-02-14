import { Component, OnInit } from '@angular/core';
import {Prosumer} from '../Prosumer';
import {ExperimentInstanceLoaderService} from '../experiment-instance-loader.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  prosumers: Prosumer[];

  constructor(private loader: ExperimentInstanceLoaderService,
              private router: Router) {  }

  ngOnInit() {
    this.getProsumers();
  }

  getProsumers(): void {
    this.loader.getProsumers().subscribe(prosumers => this.prosumers = prosumers);
  }

  loginProsumer(id: number): void {
    this.router.navigate(['ProsumerView/', id]);
  }
}
