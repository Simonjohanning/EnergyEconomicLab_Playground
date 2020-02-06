import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-prosumer-data-editor',
  templateUrl: './prosumer-data-editor.component.html',
  styleUrls: ['./prosumer-data-editor.component.css']
})

/**
 * The ProsumerDataEditor is a component that encapsulates the non-asset prosumer instance data (i.e. initial amount of tokens and feedin coordinates).
 * It allows the research to set these parameter and couple them with the respective prosumer.
 * It further provides validation logic to make sure that these variables can only be parameterized with valid entries
 */
export class ProsumerDataEditorComponent implements OnInit {
  /** EventEmitter to provide non-asset prosumer instance data to the surrounding context */
  @Output() prosumerData = new EventEmitter();
  /** The form group administrating the parameters for the respective prosumer instance to set up */
  public prosumerDataForm = new FormGroup({
    amountTokens: new FormControl ('', this.amountTokenValidator()),
    feedinCoordinates: new FormControl( '', this.feedinValidator())
  });

  constructor() { }

  ngOnInit() {
  }

  /**
   * The validation function for the tokens the Prosumer instance starts out with.
   * The amount of tokens the Prosumers can have at the begin of the simulation must not be negative.
   * If so, the respective error message will be rendered in the view.
   */
  private amountTokenValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      if (control.value < 0) {
        return {
          amountTokensIssue: 'The amount of tokens given to a Prosumer must need be negative'
        };
      } else {
        return null;
      }
    };
  }

  /**
   * The validation function for the feedin coordinates of the Prosumer instance.
   * The coordinates must be in the format (x, y), with x and y being the (non-negative) coordinates of the feedin point.
   * If this format is violated, the respective error message will be rendered in the view.
   */
  private feedinValidator(): ValidatorFn {
    const feedinRegex = /^\(([0-9]+(\.[0-9]*)),\s*([0-9]+(\.[0-9]*))\)$/i;
    return (control: AbstractControl) => {
      return feedinRegex.test(control.value) ? null : {
        feedinCoordinatesIssue: 'Feedin coordinates have to be provide in the form (x, y) with x and y being non-negative floating point numbers'
      };
    };
  }
}
