import {Component, Input, OnInit} from '@angular/core';
import {ProsumerInstance} from '../../core/data-types/ProsumerInstance';
import {Observable} from 'rxjs';
import {ExperimentInstanceLoaderService} from '../../core/experiment-instance-loader.service';
import {TimeService} from '../../core/time.service';

@Component({
  selector: 'app-persistent-resource-display',
  templateUrl: './persistent-resource-display.component.html',
  styleUrls: ['./persistent-resource-display.component.css']
})
export class PersistentResourceDisplayComponent implements OnInit {

  @Input() prosumerInstanceObservable: Observable<ProsumerInstance>;
  prosumerInstance: ProsumerInstance;
  private currentTime: number;
  constructor(private loader: ExperimentInstanceLoaderService,
              private timeService: TimeService) {}

  ngOnInit() {
    this.timeService.timeEmitter.subscribe(time => this.currentTime = time);
    this.currentTime = this.timeService.getCurrentTime();
    this.prosumerInstanceObservable.subscribe(derivedInstance => {
      this.prosumerInstance = derivedInstance;
    });
  }
}
