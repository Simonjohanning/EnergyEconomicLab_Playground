import {Injectable} from '@angular/core';
import {TimeService} from './time.service';
import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';

@Injectable()
export class TimeStepValidator {

  static timeService: TimeService;

  constructor(private timeService: TimeService){
    this.timeService = timeService;
  }

  timeStepValidator(input: FormControl) {
      console.log(this.timeService.getCurrentTime());
      if (input.value <= this.timeService.getCurrentTime()) {
        return Promise.resolve({ timeStepError: 'asset cant be scheduled anymore since time is ' + this.timeService.getCurrentTime() } );
      } else {
        return null;
      }
    }

}
