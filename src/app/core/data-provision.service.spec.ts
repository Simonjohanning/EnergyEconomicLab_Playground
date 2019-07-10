import { TestBed } from '@angular/core/testing';

import { DataProvisionService } from './data-provision.service';

describe('DataProvisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataProvisionService = TestBed.get(DataProvisionService);
    expect(service).toBeTruthy();
  });
  xdescribe('Provision of data test', () => {
  });
});
