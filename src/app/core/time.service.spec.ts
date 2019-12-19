import { TimeService } from './time.service';
import { tick } from '@angular/core/testing';

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

  // TODO: Asynchronous time?
  // TODO: stops when time's up? with whenStable?
});
