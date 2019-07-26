import {Component, Input, OnInit} from '@angular/core';
import {Load} from '../../core/data-types/Load';
import {TimeService} from '../../core/time.service';

@Component({
  selector: 'app-load-dispatch',
  templateUrl: './load-dispatch.component.html',
  styleUrls: ['./load-dispatch.component.css']
})
export class LoadDispatchComponent implements OnInit {

  @Input() asset: Load;
  @Input() timeService: TimeService;
  constructor() { }

  ngOnInit() {
  }

}
