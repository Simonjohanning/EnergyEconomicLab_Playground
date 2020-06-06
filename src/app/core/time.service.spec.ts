import { TimeService } from './time.service';
import { tick } from '@angular/core/testing';
import {DataProvisionService} from './data-provision.service';

describe('Service: TimeService', () => {

  let timeService: TimeService;

  beforeEach(() => {
    timeService = new TimeService();
  });

  it('emitted time should equal the advanced time', () => {
    const advance = [1, 4, 19, 2];
    let sum = 0;
    timeService.timeEmitter.subscribe(time => {
      advance.forEach(timeStep => {
        timeService.advanceTime(timeStep);
        sum += timeStep;
        expect(time).toEqual(sum);
      });
    });
  });

  it('advances time itself', async () => {
    timeService.timeEmitter.subscribe(time => {
      tick();
      expect(time).toEqual(1);
      tick();
      expect(time).toEqual(2);
    });
  });

  it('emitted time is current time ', () => {
    timeService.timeEmitter.subscribe(time => {
      tick();
      expect(time).toEqual(timeService.getCurrentTime());
      tick();
      expect(time).toEqual(timeService.getCurrentTime());
    });
  });

  it('should stop when time exceeds end time', () => {
    timeService.timeEmitter.subscribe(time => {
      let length;
      DataProvisionService.getExperimentLength().subscribe(expLength =>
        length = expLength);

      expect(length).toEqual(timeService.getEndTime());

      timeService.advanceTime(length);

      expect(timeService.advanceTime(1)).toThrowError('the experiment ends before taking 1 time steps!');
    });
  });
});
