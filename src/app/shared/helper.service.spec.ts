import { TestBed } from '@angular/core/testing';
import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => TestBed.configureTestingModule({}));

  // TODO what version would you prefer? beforeEach or it?
  beforeEach(() => {
    service = new HelperService();
  });

  it('should be created', () => {
    service = TestBed.get(HelperService);
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

    // TODO empty array necessary?
    it('should should deal with empty array', ()  => {
      expect(HelperService.aggregateArrays( [[]])).toEqual([]);
    });

    it('should aggregate non-empty array', () => {
      expect(HelperService.aggregateArrays(testArray)).toEqual([12, 15, 18]);
    });

  });

  // TODO what is this for?
  xdescribe('Rounding number tests', () => {

  });
});
