import {Component, OnInit, ViewChild} from '@angular/core';
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
/**
 * Component to allow to create an experiment description, based on the prosumer and market configuration of the simulation.
 * Hosts the child components and collects their data and submits them to the EDM service for storing the description.
 * A valid experiment description consists of a non-empty list of prosumers, a valid P2P market and an existing experiment description.
 */
export class ExperimentDescriptionEditorComponent implements OnInit {


  @ViewChild(ProsumerEditorComponent) prosumerEditor: ProsumerEditorComponent;
  @ViewChild(P2pMarketdesignEditorComponent) p2pmdEditor: P2pMarketdesignEditorComponent;

  descriptionForm: FormGroup = new FormGroup({
    description: new FormControl('', this.descriptionValidator())
  });

  constructor(private edmService: MockEDMService) { }

  ngOnInit() {
  }

  /**
   * Validator for the form entry allowing for a description of the experiment description.
   * Description must not be empty
   */
  private descriptionValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value === '') {
        return {
          descriptionError: 'Description is empty; please provide a valid description'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * Method to submit the experiment description to the EDM service.
   * If the description form contains no errors, it will submit the respective data to the EDM service.
   */
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
