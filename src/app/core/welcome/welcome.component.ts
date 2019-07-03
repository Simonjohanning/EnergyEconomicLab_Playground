import { Component, OnInit } from '@angular/core';
import {Prosumer} from '../data-types/Prosumer';
import {ExperimentInstanceLoaderService} from '../experiment-instance-loader.service';
import {Router} from '@angular/router';
import {DataProvisionService} from '../data-provision.service';
import {ExperimentStateService} from '../experiment-state.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  /*prosumers: Prosumer[];*/
  loginCode: string;
  errorCode: string;

  constructor(private loader: ExperimentInstanceLoaderService,
              private router: Router,
              private data: DataProvisionService,
              private state: ExperimentStateService) {  }

  ngOnInit() {
    // this.getProsumers();
    this.errorCode = '';
  }

  printStuff(): void {
    console.log('stuff');
  }

 /* getProsumers(): void {
    this.loader.getProsumers().subscribe(prosumers => this.prosumers = prosumers);
  }

  loginProsumer(id: number): void {
    this.router.navigate(['ProsumerView/', id]);
  }

  loginGridOperator(): void {
    this.router.navigate(['GridOperatorView/']);
  }

  loginPublicActor(): void {
    this.router.navigate(['PublicActorView/']);
  }

  loginExperimentDesigner(): void {
    this.router.navigate(['ExperimentDesignerView/']);
  }*/

  login(): void {
    this.errorCode = 'Attempting to login';
    const loginInformation = this.loginCode.split('_');
    this.data.experimentId = parseInt(loginInformation[0], 10);
    this.state.experimentTime = 0;
    switch (loginInformation[1]) {
      case 'Prosumer': {
        this.data.storage =  (parseInt(loginInformation[0], 10), parseInt(loginInformation[2], 10));
        this.router.navigate(['ProsumerView/', loginInformation[2]]);
        break;
      }
      case 'GridOperator': {
        this.router.navigate(['GridOperatorView/']);
        break;
      }
      case 'PublicActor': {
        this.router.navigate(['PublicActorView/']);
        break;
      }
      case 'ExperimentDesigner': {
        this.router.navigate(['ExperimentDesignerView/']);
        break;
      }
      default: {
        this.errorCode = 'actor ' + loginInformation[1] + ' does not exist.';
      }
    }
  }

  loginWCode(code: string): void {
    this.loginCode = code;
    this.login();
  }


}
