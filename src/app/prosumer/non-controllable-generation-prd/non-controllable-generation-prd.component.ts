import {Component, Input, OnInit} from '@angular/core';
import {NonControllableGenerator} from '../../core/data-types/NonControllableGenerator';

@Component({
  selector: 'app-non-controllable-generation-prd',
  templateUrl: './non-controllable-generation-prd.component.html',
  styleUrls: ['./non-controllable-generation-prd.component.css']
})
export class NonControllableGenerationPRDComponent implements OnInit {

  @Input() resource: NonControllableGenerator;

  constructor() { }

  ngOnInit() {
  }

}
