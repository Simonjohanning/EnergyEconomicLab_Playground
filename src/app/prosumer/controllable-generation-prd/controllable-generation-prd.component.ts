import { Component, Input, OnInit } from '@angular/core';
import { ControllableGenerator } from '../../core/data-types/ControllableGenerator';
import { ProsumerInstance } from '../../core/data-types/ProsumerInstance';

@Component({
  selector: 'app-controllable-generation-prd',
  templateUrl: './controllable-generation-prd.component.html',
  styleUrls: ['./controllable-generation-prd.component.css']
})

/**
 * Component to display properties of the controllable generator as asset information element
 */
export class ControllableGenerationPRDComponent implements OnInit {
  /** The respective asset to detail in the view */
  @Input() resource: ControllableGenerator;
  /** Toggle variable to toggle the view for displaying information */
  private showResource = true;

  constructor() {}
  ngOnInit() {
  }

}
