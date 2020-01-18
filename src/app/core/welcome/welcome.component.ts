import { Component, OnInit } from '@angular/core';
import { Prosumer } from '../data-types/Prosumer';
import { ExperimentInstanceLoaderService } from '../experiment-instance-loader.service';
import { Router } from '@angular/router';
import { DataProvisionService } from '../data-provision.service';
import { ExperimentStateService } from '../experiment-state.service';
import { RDFAnnotationService } from '../rdfannotation.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

/**
 * Component to show the login page of the experiment, where participants select their respective role within the simulation.
 * Allows participants to be forwarded to the respective path with the experiment code they receive for the experiment
 */
export class WelcomeComponent implements OnInit {
  /** The code participants enter for joining the experiment. Login code consists of the experiment ID, the role and (if applicable) the participant ID of the participant, as separated by "_" */
  loginCode: string;
  /** Variable to hold a potentially relevant error code */
  errorCode = '';
  /** Variable to hold a test string for testing RDF generation capabilities (will be removed eventually) */
  rdfString = '';

  constructor(private loader: ExperimentInstanceLoaderService,
              private router: Router,
              private data: DataProvisionService,
              private state: ExperimentStateService) {  }

  ngOnInit() {
  }

  // TODO include experiment registration functionality
  // TODO include signaling readiness functionality
  /**
   * Attempts to login the respective actor based on the login code they provide (as held in the login code).
   * Routes the client to the respective view for their role and provides the experiment and (if applicable) participant ID to the respective component.
   * Stores stateful information contained in the login code in the respective ExperimentStateService
   */
  login(): void {
    this.errorCode = 'Attempting to login';
    // Constant to store the components of the login information
    const loginInformation = this.loginCode.split('_');
    // The experiment ID is stored in the first part of the login code
    this.state.experimentID = parseInt(loginInformation[0], 10);
    // Select the appropriate routing based on the role of the respective actor
    switch (loginInformation[1]) {
      case 'Prosumer': {
        this.state.actorID =  parseInt(loginInformation[2], 10);
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

  /**
   * Method to let the respective agent login with a given code, by setting the code automatically and referring to the respective login method
   *
   * @param code The login code the client uses
   */
  loginWCode(code: string): void {
    this.loginCode = code;
    this.login();
  }

  // TODO remove test function for annotation service
  printTestRDF() {
    try {
      this.rdfString = RDFAnnotationService.createPrimer(['dct', 'dcat', 'org', 'rdf', 'rdfs', 'owl', 'xsd', 'skos', 'foaf', 'iirm', 'vcard', 'eur', 'dcatde']);
      this.rdfString += RDFAnnotationService.getAuthorVcardString('Simon');
      const dataSetKeywordMap = new Map<string, string[]>();
      dataSetKeywordMap.set('de', ['Spotmarkt', 'Strompreis']);
      dataSetKeywordMap.set('en', ['spot market', 'electricity price']);
      this.rdfString += RDFAnnotationService.createDataSetEntry(
        'iirm:Spot2015',
        'EEX hourly Spotmarket data for the year 2015 in Euro/MWh',
        'Price series Spotmarket EEX 2015',
        'iirm:SimonJohanning',
        'iirm:Spot2015Distribution',
        dataSetKeywordMap,
        '<eur:data-theme/ENER>',
        '\<http://dcat-ap.de/def/politicalGeocoding/stateKey/14\>'
      );
      this.rdfString += RDFAnnotationService.createDistributionEntry(
        'iirm:Spot2015Distribution',
        '<http://beispiel.de>',
        'Price series Spotmarket EEX 2015 Distribution',
        '<http://dcat-ap.de/def/licenses/cc-by-de/3.0>'
      );
    } catch (e) {
      console.log('Deriving the RDF data resulted in the following error: ' + e);
    }
  }
}
