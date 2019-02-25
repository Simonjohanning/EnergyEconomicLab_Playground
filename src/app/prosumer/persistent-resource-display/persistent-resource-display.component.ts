import {Component, Input, OnInit} from '@angular/core';
import {ProsumerInstance} from '../../core/data-types/ProsumerInstance';
import {Observable} from 'rxjs';
import {ExperimentInstanceLoaderService} from '../../core/experiment-instance-loader.service';

@Component({
  selector: 'app-persistent-resource-display',
  templateUrl: './persistent-resource-display.component.html',
  styleUrls: ['./persistent-resource-display.component.css']
})
export class PersistentResourceDisplayComponent implements OnInit {

  @Input() prosumerInstance: Observable<ProsumerInstance>;

  constructor(private loader: ExperimentInstanceLoaderService) {}

  ngOnInit() {
    this.prosumerInstance = this.loader.getProsumerData();
  }

}
