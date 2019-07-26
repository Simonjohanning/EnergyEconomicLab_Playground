import { TestBed } from '@angular/core/testing';

import { AssetOperationLogicService } from './asset-operation-logic.service';

describe('AssetOperationLogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetOperationLogicService = TestBed.get(AssetOperationLogicService);
    expect(service).toBeTruthy();
  });
});
