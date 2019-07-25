import {Component, OnInit, ViewChild} from '@angular/core';
import {Prosumer} from '../../core/data-types/Prosumer';
import {P2PMarketDesign} from '../../core/data-types/P2PMarketDesign';
import {MockEDMService} from '../../core/mock-edm.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {LoadEditorComponent} from '../load-editor/load-editor.component';
import {StorageEditorComponent} from '../storage-editor/storage-editor.component';
import {ControllableGenerator} from '../../core/data-types/ControllableGenerator';
import {CGEditorComponent} from '../cgeditor/cgeditor.component';
import {NCGEditorComponent} from '../ncgeditor/ncgeditor.component';

@Component({
  selector: 'app-prosumer-editor',
  templateUrl: './prosumer-editor.component.html',
  styleUrls: ['./prosumer-editor.component.css']
})
export class ProsumerEditorComponent implements OnInit {

  public prosumerList: Prosumer[] = new Array<Prosumer>();
  public prosumeSubject: Subject<Prosumer[]>  = new Subject<Prosumer[]>();
  private selectedProsumer: Prosumer = null;
  private selectedPill = 'Loads';

  @ViewChild(LoadEditorComponent) loadEditor: LoadEditorComponent;
  @ViewChild(StorageEditorComponent) storageEditor: StorageEditorComponent;
  @ViewChild(CGEditorComponent) cgEditor: CGEditorComponent;
  @ViewChild(NCGEditorComponent) ncgEditor: NCGEditorComponent;

  private idSuggestion: number;
  private prosumerAddForm  = new FormGroup(
    {
      id: new FormControl('', this.idValidator(this.prosumeSubject)),
      name: new FormControl('', this.nameValidator(this.prosumeSubject))
    });

  constructor(private edmService: MockEDMService) {
    this.prosumerList.push({
      name: 'defProsumer',
      id: 12
    });
  }

  ngOnInit() {
    this.idSuggestion = 1;
    this.prosumerAddForm.setValue({id: this.idSuggestion, name: ''});
  }

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

  removeProsumer(prosumerToRemove: Prosumer): void {
    this.prosumerList = this.prosumerList.filter(currentProsumer => {
      return (currentProsumer !== prosumerToRemove);
    });
    this.prosumeSubject.next(this.prosumerList);
  }

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
