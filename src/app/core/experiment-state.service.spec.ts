import { TestBed } from '@angular/core/testing';

import { ExperimentStateService } from './experiment-state.service';

describe('ExperimentStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExperimentStateService = TestBed.get(ExperimentStateService);
    expect(service).toBeTruthy();
  });
});
