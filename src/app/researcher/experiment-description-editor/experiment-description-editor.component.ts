import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MockEDMService} from '../../core/mock-edm.service';
import {ProsumerEditorComponent} from '../prosumer-editor/prosumer-editor.component';
import {P2pMarketdesignEditorComponent} from '../p2p-marketdesign-editor/p2p-marketdesign-editor.component';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-experiment-description-editor',
  templateUrl: './experiment-description-editor.component.html',
  styleUrls: ['./experiment-description-editor.component.css']
})
// TODO check if AfterViewInit hook is needed despite external triggering
export class ExperimentDescriptionEditorComponent implements OnInit {


  @ViewChild(ProsumerEditorComponent) prosumerEditor: ProsumerEditorComponent;
  @ViewChild(P2pMarketdesignEditorComponent) p2pmdEditor: P2pMarketdesignEditorComponent;

  descriptionForm: FormGroup = new FormGroup({
    description: new FormControl('', this.descriptionValidator())
  });

  constructor(private edmService: MockEDMService) { }

  ngOnInit() {
  }

  private descriptionValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value === 0) {
        return {
          descriptionError: 'Description is empty; please provide a valid description'
        };
      } else {
        return null;
      }
    };
  }

  submitExperimentDesign(): void {
    if (this.descriptionForm.errors === null) {
      this.edmService.addExperimentDescription({
        prosumers: this.prosumerEditor.prosumerList,
        p2pMarketDesign: this.p2pmdEditor.preliminaryP2PMarketDesign,
        description: this.descriptionForm.get('description').value
      });
    }
  }
}
