import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControllableGenerator} from '../../core/data-types/ControllableGenerator';
import {TimeService} from '../../core/time.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {Subject} from 'rxjs';
import {AssetOperationLogicService} from '../asset-operation-logic.service';

@Component({
  selector: 'app-cgdispatch',
  templateUrl: './cgdispatch.component.html',
  styleUrls: ['./cgdispatch.component.css']
})
export class CGDispatchComponent implements OnInit {

  @Input() asset: ControllableGenerator;
  @Input() timeService: TimeService;
  @Output() cgGenerationScheduling = new EventEmitter();
  private minGenerationRange: number;
  private maxGenerationRange: number;
  private timeServiceSubject: Subject<TimeService> = new Subject<TimeService>();

  private scheduledDispatchForm = new FormGroup({
    timeStep: new FormControl('', this.timeStepValidator(this.timeServiceSubject)),
    scheduledDispatch: new FormControl('')
  });

  constructor() {
  }

  ngOnInit() {
    this.timeServiceSubject.next(this.timeService);
    this.minGenerationRange = 3;
    this.maxGenerationRange = 45;
  }

  //TODO work on slider
  adjustSlider() {
    this.minGenerationRange = AssetOperationLogicService.deriveMinimalGenerationCG(this.asset, this.scheduledDispatchForm.get('timeStep').value);
    this.maxGenerationRange = AssetOperationLogicService.deriveMaximalGenerationCG(this.asset, this.scheduledDispatchForm.get('timeStep').value);
    if (this.minGenerationRange > this.maxGenerationRange) {
      this.minGenerationRange = this.maxGenerationRange;
    } else if (this.maxGenerationRange < this.minGenerationRange){
      this.maxGenerationRange = this.minGenerationRange;
    }
  }

  scheduleTimeStep() {
    console.log('form value: ' + this.scheduledDispatchForm.get('timeStep').value);
    console.log('status of time service: ' + this.timeService);
    console.log('value of time service: ' + this.timeService.getCurrentTime());
    this.cgGenerationScheduling.emit({
      asset: this.asset,
      scheduledTimeStep: this.scheduledDispatchForm.get('timeStep').value,
      plannedGenerationValue: this.scheduledDispatchForm.get('scheduledDispatch').value
    });
  }

  private timeStepValidator(timeServSub: Subject<TimeService>): ValidatorFn {
    let timeServ: TimeService = null;
    return (control: AbstractControl) => {
      timeServSub.subscribe(tService => {
        console.log('subscription active');
        timeServ = tService;
      });
      console.log('in tsVal, the service is ' + timeServ);
      if (timeServ) {
        console.log(timeServ.getCurrentTime());
        if (control.value <= timeServ.getCurrentTime()) {
          return {
            timeStepError: 'asset cant be scheduled anymore since time is ' + timeServ.getCurrentTime()
          };
        } else {
          return null;
        }
      } else {
        console.log('time service is not');
        return null;
      }
    };
  }
}
