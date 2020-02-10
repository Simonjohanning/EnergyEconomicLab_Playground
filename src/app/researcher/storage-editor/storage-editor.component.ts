import { Component, OnInit } from '@angular/core';
import { StorageUnit } from '../../core/data-types/StorageUnit';
import { Subject } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { MockEDMService } from '../../core/mock-edm.service';

@Component({
  selector: 'app-storage-editor',
  templateUrl: './storage-editor.component.html',
  styleUrls: ['./storage-editor.component.css']
})

/**
 * Component that allows the creation of storage units for the configuration of the respective experiments.
 * Allows to create (valid) storage unit out of nothing or to base a new storage unit on an existing (parameterized) storage unit.
 * A storage unit is valid if the model name is unique, , its storage capacity is non-negative, its feed-in power is non-negative, its feed-out power is non-negative, its cycle efficiency is in the unit interval and its initial state of charge is in the unit interval
 */
export class StorageEditorComponent implements OnInit {
  /** container for the respective assets loaded from the data base */
  private storageUnits: StorageUnit[];
  /** subject wrapper for the loaded assets for injecting them in the validator */
  private storageUnitSubject: Subject<StorageUnit[]> = new Subject<StorageUnit[]>();
  /** entry selection model for choosing preconfigured, existing assets */
  private selectedModel = '';

  /**
   * Form Group (storageForm) representing the storage assets to edit with
   * draftModel: the (preliminary) model string of the asset
   * draftStorageCapacity: the (preliminary) storage capacity of the asset
   * draftFeedinPower: the (preliminary) maximal power electricity can be fed into the storage unit
   * draftFeedoutPower: the (preliminary) maximal power electricity can be taken out of the storage unit
   * draftCycleEfficiency: the (preliminary) efficiency of a battery cycle (loading, storing, unloading), as fraction of the amount of electricity left
   * draftInitialSOC: the (preliminary) level of the state of charge relative to the fully charged battery
   */
  private storageForm = new FormGroup({
    draftModel: new FormControl('', this.modelValidator(this.storageUnitSubject)),
    draftStorageCapacity: new FormControl('', this.storageCapacityValidator()),
    draftFeedinPower: new FormControl('', this.feedInPowerValidator()),
    draftFeedoutPower: new FormControl('', this.feedOutPowerValidator()),
    draftCycleEfficiency: new FormControl('', this.cycleEfficiencyValidator()),
    draftInitialSOC: new FormControl('', this.initialSOCValidator())
  });

  /**
   * Constructor sets up the templates from which new assets can be derived.
   * Uses the respective EDMService for accessing the 'Energiedatenmarkt' hosting the data
   *
   * @param mes The service accessing the EDM data base
   */
  constructor(private mes: MockEDMService) {
    MockEDMService.getConfiguredStorages().subscribe(retrievedStorageUnits => {
      this.storageUnits = retrievedStorageUnits;
      this.storageUnitSubject.next(this.storageUnits);
    });
  }

  ngOnInit() {
  }

  /**
   * Validator for the model entry in the form.
   * The model name must be different from any other model in the data base in order to validate
   *
   * @param storageUnitsub subject emitting the storage units in the data base to compare against
   */
  modelValidator(storageUnitsub: Subject<StorageUnit[]>): ValidatorFn {
    let storageUnits: StorageUnit[] = new Array<StorageUnit>();
    return (control: AbstractControl) => {
      storageUnitsub.subscribe(existingstorageUnits => {
        storageUnits = existingstorageUnits;
      });
      let errorString = '';
      storageUnits.forEach(currentStorage => {
        if (currentStorage.model === control.value) {
          errorString = ('Chosen model name is already taken by ' + currentStorage.model);
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
   * Validator for the storage capacity of the asset.
   * Capacity must be non-negative in order to validate.
   */
  private storageCapacityValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < 0) {
        return {
          storageCapacityError: 'Storage capacity cant be negative'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Validator for the feed in power of the asset
   * Feed in power must be non-negative in order to validate
   */
  private feedInPowerValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < 0) {
        return {
          feedinPowerError: 'Feed in power cant be negative'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Validator for the feed out power of the asset
   * Feed out power must be non-negative in order to validate
   */
  private feedOutPowerValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < 0) {
        return {
          feedoutPowerError: 'Feed out power cant be negative'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Validator for the cycle efficiency of the asset
   * Cycle efficiency must be between 0 and 1 in order to validate
   */
  private cycleEfficiencyValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if ((control.value > 1.0) || (control.value < 0)) {
        return {
          cycleEfficiencyError: 'Cycle efficiency has to be in the unit interval'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Validator for the initial state-of-charge (SOC) of the asset
   * SOC must be between 0 and 1 in order to validate
   */
  private initialSOCValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if ((control.value > 1.0) || (control.value < 0)) {
        return {
          initialSOCError: 'Initial state of charge has to be in the unit interval'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Function to set the input fields of the form to the respective values corresponding to the storage asset selected in the selection list (select / option element in the .html of the component)
   */
  setParameters(): void {
    this.storageUnits.forEach(currentStorage => {
      if (currentStorage.model === this.selectedModel) {
        this.storageForm.get('draftModel').setValue(currentStorage.model);
        this.storageForm.get('draftStorageCapacity').setValue(currentStorage.storageCapacity);
        this.storageForm.get('draftFeedinPower').setValue(currentStorage.feedinPower);
        this.storageForm.get('draftFeedoutPower').setValue(currentStorage.feedoutPower);
        this.storageForm.get('draftCycleEfficiency').setValue(currentStorage.cycleEfficiency);
        this.storageForm.get('draftInitialSOC').setValue(currentStorage.initialSOC);
      }
    });
  }

  /**
   * Function to reset the input fields in the html file of the component (resetting to empty strings or 0-values)
   */
  resetParameters(): void {
    this.storageForm.setValue({
      draftModel: '',
      draftStorageCapacity: 0,
      draftFeedinPower: 0,
      draftFeedoutPower: 0,
      draftCycleEfficiency: 0,
      draftInitialSOC: 0
    });
  }

  /**
   * Function to store the drafted asset according to the values specified in the form through the respective EDM service
   */
  storeStorageTemplate(): void {
    this.mes.addNewStorage(new StorageUnit(
      this.storageForm.get('draftModel').value,
      this.storageForm.get('draftStorageCapacity').value,
      this.storageForm.get('draftFeedinPower').value,
      this.storageForm.get('draftFeedoutPower').value,
      this.storageForm.get('draftCycleEfficiency').value,
      this.storageForm.get('draftInitialSOC').value
    ));
  }
}
