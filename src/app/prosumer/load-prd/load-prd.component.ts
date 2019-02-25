import {Component, Input, OnInit} from '@angular/core';
import {Load} from '../../core/data-types/Load';

@Component({
  selector: 'app-load-prd',
  templateUrl: './load-prd.component.html',
  styleUrls: ['./load-prd.component.css']
})
export class LoadPRDComponent implements OnInit {

  @Input() resource: Load;

  constructor() { }

  ngOnInit() {
  }

}
