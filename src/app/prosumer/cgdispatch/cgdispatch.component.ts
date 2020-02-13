import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControllableGenerator } from '../../core/data-types/ControllableGenerator';
import { TimeService } from '../../core/time.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';
import { AssetOperationLogicService } from '../asset-operation-logic.service';

@Component({
  selector: 'app-cgdispatch',
  templateUrl: './cgdispatch.component.html',
  styleUrls: ['./cgdispatch.component.css']
})

/**
 * Component to provide dispatch functionality for contollable generators.
 * Allows for setting the respective functionality of the dispatch within operational bounds of the asset
 */
export class CGDispatchComponent implements OnInit {
  /** The controllable generator that is to be dispatched */
  @Input() asset: ControllableGenerator;
  /** The time service of the simulation for providing the temporal context of the asset dispatch */
  @Input() timeService: TimeService;
  /** The emitter through which the asset dispatch is provided to the parent component */
  @Output() cgGenerationScheduling = new EventEmitter();
  /** The minimal generation the generator can be set too for the respective time step given the technical constraints and dispatch data of the generator */
  private minGenerationRange: number;
  /** The maximal generation the generator can be set too for the respective time step given the technical constraints and dispatch data of the generator */
  private maxGenerationRange: number;
  /** Helper subject to provide the respective time service to the validator for the temporal dimension of the input component of the dispatch form */
  private timeServiceSubject: Subject<TimeService> = new Subject<TimeService>();
  /** The form group to contain and validate the dispatch data for the generator in question */
  private scheduledDispatchForm = new FormGroup({
    timeStep: new FormControl('', this.timeStepValidator(this.timeServiceSubject)),
    scheduledDispatch: new FormControl('')
  });

  constructor() {
  }

  ngOnInit() {
    // emit the respective time service when it is available to the component in order to make it available for the temporal validator
    this.timeServiceSubject.next(this.timeService);
    this.minGenerationRange = 0;
    this.maxGenerationRange = this.asset.maximalGeneration;
  }

  /**
   * Method to change the slider ranges for the dispatch form element when the temporal context for the dispatch changes
   * Derives new generation range bounds based on the operational constraints as asserted by the AssetOperationLogicService
   */
  adjustSlider() {
    this.minGenerationRange = AssetOperationLogicService.deriveMinimalGenerationCG(this.asset, this.scheduledDispatchForm.get('timeStep').value);
    this.maxGenerationRange = AssetOperationLogicService.deriveMaximalGenerationCG(this.asset, this.scheduledDispatchForm.get('timeStep').value);
    if (this.minGenerationRange > this.maxGenerationRange) {
      this.minGenerationRange = this.maxGenerationRange;
    } else if (this.maxGenerationRange < this.minGenerationRange) {
      this.maxGenerationRange = this.minGenerationRange;
    }
    console.log('Slider been readjusted to [' + this.minGenerationRange + ', ' + this.maxGenerationRange + '].');
  }

  /**
   * Method to schedule the dispatch for the respective time step when the dispatch schedule is changed in the respective form.
   * Uses the scheduling emitter to propagate the dispatch scheduling to the respective context
   */
  scheduleTimeStep() {
    console.log('form value: ' + this.scheduledDispatchForm.get('timeStep').value);
    console.log('status of time service: ' + this.timeService);
    console.log('value of time service: ' + this.timeService.getCurrentTime());
    this.cgGenerationScheduling.emit({
      asset: this.asset,
      scheduledTimeStep: this.scheduledDispatchForm.get('timeStep').value,
      plannedDispatchValue: this.scheduledDispatchForm.get('scheduledDispatch').value
    });
  }

  /**
   * Validator function to provide validation for the temporal dimension of the asset dispatch scheduling
   *
   * @param timeServSub The subject the provides the time service needed for the temporal validation
   */
  private timeStepValidator(timeServSub: Subject<TimeService>): ValidatorFn {
    let timeServ: TimeService = null;
    return (control: AbstractControl) => {
      // once the time service is provided, set it internally
      timeServSub.subscribe(tService => {
        console.log('subscription active');
        timeServ = tService;
      });
      console.log('in tsVal, the service is ' + timeServ);
      if (timeServ) {
        console.log(timeServ.getCurrentTime());
        // prevent scheduling for past events
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
