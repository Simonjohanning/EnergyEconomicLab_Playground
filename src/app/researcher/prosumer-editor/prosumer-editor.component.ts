import {Component, OnInit, ViewChild} from '@angular/core';
import {Prosumer} from '../../core/data-types/Prosumer';
import {MockEDMService} from '../../core/mock-edm.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {Subject} from 'rxjs';
import {LoadEditorComponent} from '../load-editor/load-editor.component';
import {StorageEditorComponent} from '../storage-editor/storage-editor.component';
import {CGEditorComponent} from '../cgeditor/cgeditor.component';
import {NCGEditorComponent} from '../ncgeditor/ncgeditor.component';
import {ProsumerDataEditorComponent} from "../prosumer-data-editor/prosumer-data-editor.component";

@Component({
  selector: 'app-prosumer-editor',
  templateUrl: './prosumer-editor.component.html',
  styleUrls: ['./prosumer-editor.component.css']
})

/**
 * Component to allow the creation and editing of prosumers (more exactly prosumer instances) and their assets
 * Directly hosts the prosumer information (i.e. name and id) and hosts children components for the respective assets.
 * Provides validators for prosumer information and allows to add and remove them
 *
 */
export class ProsumerEditorComponent implements OnInit {
  /** variable to hold the prosumers involved in the editor */
  public prosumerList: Prosumer[] = new Array<Prosumer>();
  /** A subject to derive the existing prosumers from */
  public prosumeSubject: Subject<Prosumer[]>  = new Subject<Prosumer[]>();
  /** selection variable to refer to the prosumer selected by the user */
  private selectedProsumer: Prosumer = null;
  /** selector variable to refer to the pill selected by the user */
  private selectedPill = 'Loads';
  /** Selector to hide the asset editor */
  private showAssets = true;

  /** Child component to allow the user to add loads to the prosumer instances */
  @ViewChild(LoadEditorComponent) loadEditor: LoadEditorComponent;
  /** Child component to allow the user to add storage units to the prosumer instances */
  @ViewChild(StorageEditorComponent) storageEditor: StorageEditorComponent;
  /** Child component to allow the user to add controllable generators to the prosumer instances */
  @ViewChild(CGEditorComponent) cgEditor: CGEditorComponent;
  /** Child component to allow the user to add non-controllable generators to the prosumer instances */
  @ViewChild(NCGEditorComponent) ncgEditor: NCGEditorComponent;
  /** Child component to set the non-asset parameters of the Prosumer */
  @ViewChild(ProsumerDataEditorComponent) pdEditor: ProsumerDataEditorComponent;
  /** variable to hold an id to suggest to the user when asked */
  private idSuggestion: number;
  /** Form to allows the user to enter (and validate) prosumer information in the form */
  private prosumerAddForm  = new FormGroup(
    {
      id: new FormControl('', this.idValidator(this.prosumeSubject)),
      name: new FormControl('', this.nameValidator(this.prosumeSubject))
    });

  constructor() {
    // TODO remove this test prosumer
    this.prosumerList.push({
      name: 'defProsumer',
      id: 12
    });
  }

  ngOnInit() {
    this.idSuggestion = 1;
    this.prosumerAddForm.setValue({id: this.idSuggestion, name: ''});
  }

  /**
   * Validation method for the id of the prosumer to be added.
   * ID is valid if it is not already taken by another prosumer used in the experiments
   *
   * @param prosumerSubject The subject refering to the emitter of the Prosumers used in the experiments
   */
  idValidator(prosumerSubject: Subject<Prosumer[]>): ValidatorFn {
    let prosumers: Prosumer[] = new Array<Prosumer>();
    return (control: AbstractControl) => {
      prosumerSubject.subscribe(updatedProsumerList => {
        prosumers = updatedProsumerList;
      });
      let errorString = '';
      prosumers.forEach(currentProsumer => {
        if (currentProsumer.id === control.value) {
          errorString = 'id ' + control.value + ' already taken by consumer with name' + currentProsumer.name;
        }
      });
      if (errorString !== '') {
        return {
          idIssue: errorString
        };
      } else { return null; }
    };
  }

  /**
   * Validation method for the name of the prosumer to be added.
   * Name is valid if it is not already taken by another prosumer used in the experiments
   *
   * @param prosumerSubject The subject refering to the emitter of the Prosumers used in the experiments
   */
  nameValidator(prosumerSubject: Subject<Prosumer[]>): ValidatorFn {
    let prosumers: Prosumer[] = new Array<Prosumer>();
    return (control: AbstractControl) => {
      prosumerSubject.subscribe(updatedProsumerList => {
        prosumers = updatedProsumerList;
      });
      console.log('in name validator, ' + prosumers.length + ' prosumers');
      let errorString = '';
      prosumers.forEach(currentProsumer => {
        if (currentProsumer.name === control.value) {
          console.log('name ' + control.value + ' already exists');
          errorString = 'name ' + control.value + ' already taken by consumer with id' + currentProsumer.id;
        }
      });
      if (errorString !== '') {
        return {
          nameIssue: errorString
        };
      } else { return null; }
    };
  }

  /**
   * Method to remove a prosumer from the list in the view of the component
   *
   * @param prosumerToRemove The prosumer that is to be removed from the respective list
   */
  removeProsumer(prosumerToRemove: Prosumer): void {
    this.prosumerList = this.prosumerList.filter(currentProsumer => {
      return (currentProsumer !== prosumerToRemove);
    });
    this.prosumeSubject.next(this.prosumerList);
  }

  /**
   * Method to add a prosumer to the list in the view of the component based on the information in the prosumer form
   */
  addProsumer(): void {
    this.prosumerList.push({
      name: this.prosumerAddForm.value.name,
      id: this.prosumerAddForm.value.id
    });
    this.prosumeSubject.next(this.prosumerList);
    this.idSuggestion = ++this.prosumerAddForm.value.id;
    this.prosumerAddForm.reset();
    this.prosumerAddForm.setValue({id: this.idSuggestion, name: ''});
  }
}
