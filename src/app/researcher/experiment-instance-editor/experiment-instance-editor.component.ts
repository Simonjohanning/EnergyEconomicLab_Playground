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
export class ExperimentInstanceEditorComponent implements OnInit {

  private takenIds: Set<number> = new Set<number>();
  private takendIdSubject: Subject<Set<number>> = new Subject<Set<number>>();
  private selectedED: ExperimentDescription;
  private experimentDescriptions: ExperimentDescription[];

  constructor(private edm: MockEDMService) { }

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

  saveExperimentInstance() {
    this.edm.addExperimentInstance({
      experimentID: this.experimentInstanceForm.get('id').value,
      instanceOfExperiment: this.selectedED
    });
  }

}
