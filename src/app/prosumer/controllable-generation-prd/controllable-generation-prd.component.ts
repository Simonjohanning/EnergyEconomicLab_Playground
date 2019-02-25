import {Component, Input, OnInit} from '@angular/core';
import {ControllableGenerator} from '../../core/data-types/ControllableGenerator';
import {ProsumerInstance} from '../../core/data-types/ProsumerInstance';

@Component({
  selector: 'app-controllable-generation-prd',
  templateUrl: './controllable-generation-prd.component.html',
  styleUrls: ['./controllable-generation-prd.component.css']
})
export class ControllableGenerationPRDComponent implements OnInit {

  @Input() resource: ControllableGenerator;

  constructor() {}
  ngOnInit() {
  }

}
