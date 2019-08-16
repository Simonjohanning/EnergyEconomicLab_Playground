import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {Subject} from 'rxjs';
import {MockEDMService} from '../../core/mock-edm.service';
import {ExperimentDescription} from '../../core/data-types/ExperimentDescription';

@Component({
  selector: 'app-experiment-instance-editor',
  templateUrl: './experiment-instance-editor.component.html',
  styleUrls: ['./experiment-instance-editor.component.css']
})

/**
 * Component to create an experiment instance based on an experiment description.
 * This allows to identify the respective instances of experiments with the same design by assigning an ID to them.
 * An experiment instance is valid if there is not another experiment instance using the same ID.
 */
export class ExperimentInstanceEditorComponent implements OnInit {
  /** Set to contain the IDs already used in other experiment instance in order to validate the chosen ID for this experiment */
  private takenIds: Set<number> = new Set<number>();
  /** A subject element that emits the respective taken IDs from the EDM service */
  private takendIdSubject: Subject<Set<number>> = new Subject<Set<number>>();
  /** A selection variable for the experiment description this experiment instance is an instance of */
  private selectedED: ExperimentDescription;
  /** Local data to host experiment descriptions to choose from (to associate with the experiment instance) */
  private experimentDescriptions: ExperimentDescription[];

  constructor(private edm: MockEDMService) { }
  /** Form to hold the information associated with this instance */
  private experimentInstanceForm: FormGroup = new FormGroup({
    id: new FormControl('', this.idValidator(this.takendIdSubject))
  });

  ngOnInit() {
    this.edm.getExperimentInstanceIDSet().subscribe(takenIDArray => {
      this.takenIds = takenIDArray;
    });
    this.edm.getExperimentInstanceIDSet().subscribe(numberSet => {
      this.takendIdSubject.next(numberSet);
      console.log('Taken ids: ');
      numberSet.forEach(currentOne => {
        console.log(currentOne);
      });
    });
    this.experimentDescriptions = this.edm.getExperimentDescriptions();
  }

  /**
   * Helper method to suggest an ID if the user gets frustrated by the number of taken IDs.
   * Finds a 'random' ID not taken by another experiment description and returns it.
   *
   * @returns A non-taken ID (an ID that is not associated with any other experiment instance
   */
  private suggestID(): number {
    let idRange = 1;
    let freeIDFound = false;
    while (!freeIDFound) {
      const suggestedID = Math.floor(Math.random() * idRange);
      if (this.takenIds.has(suggestedID)) {
        idRange *= 2;
      } else {
        freeIDFound = true;
        return suggestedID;
      }
    }
  }

  /**
   * Validator function for the ID used in the respective form
   *
   * @param idFetchSubject A subject that emits all IDs taken in the experiment to compare against.
   */
  private idValidator(idFetchSubject: Subject<Set<number>>): ValidatorFn {
    let takenIds: Set<number> = new Set<number>();
    idFetchSubject.subscribe(retrievedIds => {
      takenIds = retrievedIds;
    });
    return (control: AbstractControl) => {
      if (takenIds.has(control.value)) {
        return {
          idError: ('id ' + control.value + ' already used for another experiment instance. Please select an unused one')
        };
      } else if ((control.value < 0) || (!Number.isInteger(control.value))) {
        return {
          idError: 'id has to be a non-negative integer'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Method to save the experiment instance (i.e. by requesting the EDM service to add the experiment instance to the data store.
   */
  private saveExperimentInstance() {
    this.edm.addExperimentInstance({
      experimentID: this.experimentInstanceForm.get('id').value,
      instanceOfExperiment: this.selectedED
    });
  }

}
