import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {MockEDMService} from '../../core/mock-edm.service';
import {NonControllableGenerator} from '../../core/data-types/NonControllableGenerator';

@Component({
  selector: 'app-ncgeditor',
  templateUrl: './ncgeditor.component.html',
  styleUrls: ['./ncgeditor.component.css']
})
export class NCGEditorComponent implements OnInit {

  // container for the respective assets loaded from the data base
  private ncgs: NonControllableGenerator[];
  // subject wrapper for the loaded assets for injecting them in the validator
  private ncgSubject: Subject<NonControllableGenerator[]> = new Subject<NonControllableGenerator[]>();
  // entry selection model for choosing preconfigured, existing assets
  private selectedModel = '';

  /**
   * Form Group (nCGForm) representing the non-controllable generator to edit with
   * draftModel: the (preliminary) model string of the asset
   * draftPeakPower: the (preliminary) value for the maximum generated power of the asset
   * draftProjectedGeneration: the (preliminary) time series for generated electricity of the asset
   */
  private nCGForm = new FormGroup({
    draftModel: new FormControl('', this.modelValidator(this.ncgSubject)),
    draftPeakPower: new FormControl('', this.peakPowerValidator()),
    draftProjectedGeneration: new FormControl('', this.projectedGenerationValidator())
  });

  /**
   * Constructor sets up the templates from which new assets can be derived.
   * Uses the respective EDMService for accessing the 'Energiedatenmarkt' hosting the data
   *
   * @param mes The service accessing the EDM data base
   */
  constructor(private mes: MockEDMService) {
    this.mes.getConfiguredNCGs().subscribe(retrievedNCGs => {
      this.ncgs = retrievedNCGs;
      this.ncgSubject.next(this.ncgs);
    });
  }

  ngOnInit() {
  }

  /**
   * Validator for the model entry in the form.
   * The model name must be different from any other model in the data base in order to validate
   *
   * @param ncgSub A subject emitting the NCGs in the data base to compare against
   */
  modelValidator(ncgSub: Subject<NonControllableGenerator[]>): ValidatorFn {
    let ncgs: NonControllableGenerator[] = new Array<NonControllableGenerator>();
    return (control: AbstractControl) => {
      ncgSub.subscribe(existingNCGs => {
        ncgs = existingNCGs;
      });
      let errorString = '';
      ncgs.forEach(currentNCG => {
        if (currentNCG.model === control.value) {
          errorString = ('Chosen model name is already taken by ' + currentNCG.model);
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
   * Validator for the peak power entry in the form.
   * Entry validates when the peak power input value is non-negative
   *
   */
  private peakPowerValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < 0) {
        return {
          peakPowerError: 'Peak power cant be negative'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Validator for the peak power entry in the form.
   * Entry validates its a valid series of (non-negative) floating point values, separated by commas
   *
   */
  private projectedGenerationValidator(): ValidatorFn {
    const lpRegex = /^([0-9]*\.[0-9]*,\s*)*([0-9]*\.[0-9]*)$/i;
    return (control: AbstractControl) => {
      return lpRegex.test(control.value) ? null : {
        projectedGenerationError: 'Projecte Generation needs to consist of a comma-separated series of floating point numbers'
      };
    };
  }

  /**
   * Function to set the input fields of the form to the respective values corresponding to the NCG asset selected in the selection list (select / option element in the .html of the component)
   */
  setParameters(): void {
    this.ncgs.forEach(currentNCg => {
      if (currentNCg.model === this.selectedModel) {
        this.nCGForm.get('draftModel').setValue(currentNCg.model);
        this.nCGForm.get('draftPeakPower').setValue(currentNCg.peakPower);
        this.nCGForm.get('draftProjectedGeneration').setValue(currentNCg.projectedGeneration);
      }
    });
  }

  /**
   * Function to reset the input fields in the html file of the component (resetting to empty strings or 0-values)
   */
  resetParameters(): void {
    this.nCGForm.get('draftModel').setValue('');
    this.nCGForm.get('draftPeakPower').setValue(0);
    this.nCGForm.get('draftProjectedGeneration').setValue('');
  }


  /**
   * Function to store the drafted asset according to the values specified in the form through the respective EDM service
   */
  storeNCGTemplate(): void {
    this.mes.addNewNonControllableGenerator(new NonControllableGenerator(
      this.nCGForm.get('draftModel').value,
      this.nCGForm.get('draftPeakPower').value,
      this.nCGForm.get('draftProjectedGeneration').value
      ));
  }
}
