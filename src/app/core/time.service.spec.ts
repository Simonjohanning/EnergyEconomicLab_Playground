import { TestBed } from '@angular/core/testing';

import { TimeService } from './time.service';

describe('TimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeService = TestBed.get(TimeService);
    expect(service).toBeTruthy();
  });

  xdescribe('Time configuration test', () => {
    xit('test discrete time regime configuration', () => {

    });
    xit('test continuous time regime configuration', () => {

    });
    xit('test simulation length / end time', () => {

    });
  });

  xdescribe('discrete time emission test', () => {

  });

  xdescribe('continuous time emission test', () => {

  });

  xdescribe('manual time advance test', () => {

  });
});
