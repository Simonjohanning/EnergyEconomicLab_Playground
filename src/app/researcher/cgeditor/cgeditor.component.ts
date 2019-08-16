import { Component, OnInit } from '@angular/core';
import {MockEDMService} from '../../core/mock-edm.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {Subject} from 'rxjs';
import {ControllableGenerator} from '../../core/data-types/ControllableGenerator';

@Component({
  selector: 'app-cgeditor',
  templateUrl: './cgeditor.component.html',
  styleUrls: ['./cgeditor.component.css']
})

/**
 * Component to allow the configuration of controllable generator assets for the configuration of experiments.
 * Allows to build upon existing (configured) generators and to add new ones and provides simple validators for the attributes of these assets
 */
export class CGEditorComponent implements OnInit {

  // container for the respective assets loaded from the data base
  private cgs: ControllableGenerator[];
  // subject wrapper for the loaded assets for injecting them in the validator
  private cgSubject: Subject<ControllableGenerator[]> = new Subject<ControllableGenerator[]>();
  // entry selection model for choosing preconfigured, existing assets
  private selectedModel = '';

  /**
   * Form Group (cgForm) representing the controllable generator to edit with
   * draftModel: the (preliminary) model string of the asset
   * draftMaximalGeneration: the (preliminary) generation limit of the generator
   * draftMinimalDowntime: the (preliminary) minimal time on a low level after ramping down
   * draftMinimalUptime: the (preliminary)  minimal time on a high level after ramping up
   * draftRampingParameter: the (preliminary) ramping parameter (i.e. how quickly generation can change)
   * draftHeatCouplingNumber: the (preliminary) heat coupling number (i.e. heat generation in conjunction with electricity generation)
   */
  private cgForm = new FormGroup({
    draftModel: new FormControl('', this.modelValidator(this.cgSubject)),
    draftMaximalGeneration: new FormControl('', this.maximalGenerationValidator()),
    draftMinimalDowntime: new FormControl('', this.minimalDowntimeValidator()),
    draftMinimalUptime: new FormControl('', this.minimalUptimeValidator()),
    draftRampingParameter: new FormControl('', this.rampingParameterValidator()),
    draftHeatCouplingNumber: new FormControl('', this.heatCouplingNumberValidator())
  });

  /**
   * Constructor sets up the templates from which new assets can be derived.
   * Uses the respective EDMService for accessing the 'Energiedatenmarkt' hosting the data
   *
   * @param mes The service accessing the EDM data base
   */
  constructor(private mes: MockEDMService) {
    MockEDMService.getConfiguredCGs().subscribe(retrievedCGs => {
      this.cgs = retrievedCGs;
      this.cgSubject.next(this.cgs);
    });
  }

  ngOnInit() {
  }

  /**
   * Validator for the model entry in the form.
   * The model name must be different from any other model in the data base in order to validate
   *
   * @param cgSub A subject emitting the CGs in the data base to compare against
   */
  modelValidator(cgSub: Subject<ControllableGenerator[]>): ValidatorFn {
    let cgs: ControllableGenerator[] = new Array<ControllableGenerator>();
    return (control: AbstractControl) => {
      cgSub.subscribe(existingCGs => {
        cgs = existingCGs;
      });
      let errorString = '';
      cgs.forEach(currentCG => {
        if (currentCG.model === control.value) {
          errorString = ('Chosen model name is already taken by ' + currentCG.model);
        }
      });
      if (errorString !== '') {
        return {
          modelError: errorString
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Validator for the maximal generation entry in the form.
   * Entry validates when the maximal generation input value is non-negative
   *
   */
  private maximalGenerationValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < 0) {
        return {
          maximalGenerationError: 'Maximal generation cant be negative'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Validator for the minimal downtime entry in the form.
   * Entry validates when the minimal downtime input value is non-negative
   *
   */
  private minimalDowntimeValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < 0) {
        return {
          minimalDowntimeError: 'Minimal Downtime cant be negative'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Validator for the minimal uptime entry in the form.
   * Entry validates when the minimal uptime input value is non-negative
   *
   */
  private minimalUptimeValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < 0) {
        return {
          minimalUptimeError: 'Minimal Uptime cant be negative'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Validator for the ramping parameter entry in the form.
   * Entry validates when the ramping parameter input value is within the unit interval (between 0 and 1)
   *
   */
  private rampingParameterValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if ((control.value > 1.0) || (control.value < 0)) {
        return {
          rampingParameterError: 'Ramping Parameter has to be in the unit interval'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Validator for the heat coupling number entry in the form.
   * Entry validates when the heat coupling number input value is non-negative
   *
   */
  private heatCouplingNumberValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < 0) {
        return {
          heatCouplingNumberError: 'Heat Coupling Number cant be negative'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Function to set the input fields of the form to the respective values corresponding to the CG asset selected in the selection list (select / option element in the .html of the component)
   */
  setParameters(): void {
    this.cgs.forEach(currentCg => {
      if (currentCg.model === this.selectedModel) {
        this.cgForm.get('draftModel').setValue(currentCg.model);
        this.cgForm.get('draftMaximalGeneration').setValue(currentCg.maximalGeneration);
        this.cgForm.get('draftMinimalDowntime').setValue(currentCg.minimalDowntime);
        this.cgForm.get('draftMinimalUptime').setValue(currentCg.minimalUptime);
        this.cgForm.get('draftRampingParameter').setValue(currentCg.rampingParameter);
        this.cgForm.get('draftHeatCouplingNumber').setValue(currentCg.heatCouplingNumber);
      }
    });
  }

  /**
   * Function to reset the input fields in the html file of the component (resetting to empty strings or 0-values)
   */
  resetParameters(): void {
    this.cgForm.get('draftModel').setValue('');
    this.cgForm.get('draftMaximalGeneration').setValue(0);
    this.cgForm.get('draftMinimalDowntime').setValue(0);
    this.cgForm.get('draftMinimalUptime').setValue(0);
    this.cgForm.get('draftRampingParameter').setValue(0);
    this.cgForm.get('draftHeatCouplingNumber').setValue(0);
  }

  /**
   * Function to store the drafted asset according to the values specified in the form through the respective EDM service
   */
  storeCGTemplate(): void {
    this.mes.addNewControllableGenerator(
      new ControllableGenerator(
        this.cgForm.get('draftModel').value,
        this.cgForm.get('draftMaximalGeneration').value,
        this.cgForm.get('draftMinimalDowntime').value,
        this.cgForm.get('draftMinimalUptime').value,
        this.cgForm.get('draftRampingParameter').value,
        this.cgForm.get('draftHeatCouplingNumber').value
      ));
  }
}
