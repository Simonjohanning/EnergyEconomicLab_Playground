import { TestBed } from '@angular/core/testing';
import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => TestBed.configureTestingModule({}));

  // TODO what version would you prefer? beforeEach or it?
  beforeEach(() => {
    service = TestBed.get(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    service = null;
  });

  describe('Array aggregation test', () => {
    let testArray = [];

    beforeEach(() => {
      testArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    });

    afterEach(() => {
      testArray = [];
    });

    it('should should deal with empty array', ()  => {
      expect(service.aggregateArrays( [[]])).toEqual([]);
    });

    it('should aggregate non-empty array', () => {
      expect(service.aggregateArrays(testArray)).toEqual([12, 15, 18]);
    });

  });
});
