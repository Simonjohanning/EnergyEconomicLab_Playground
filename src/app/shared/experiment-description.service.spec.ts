import { TestBed } from '@angular/core/testing';

import { ExperimentDescriptionService } from './experiment-description.service';

describe('ExperimentDescriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExperimentDescriptionService= TestBed.get(ExperimentDescriptionService);
    expect(service).toBeTruthy();
  });

  xdescribe('Configuration is checked accordingly', () => {

  });
});
