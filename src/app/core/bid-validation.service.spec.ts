import { TestBed } from '@angular/core/testing';

import { BidValidationService } from './bid-validation.service';

describe('BidValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BidValidationService = TestBed.get(BidValidationService);
    expect(service).toBeTruthy();
  });

  xdescribe('Bid validation', () => {
    xdescribe('Feed-In-Time validation', () => {
      xit('Valid Feed-In-Time gets accepted', () => {
      });

      xit('Invalid Feed-In-Time gets filtered out', () => {
      });
    });

    xdescribe('Duration validation', () => {
      xit('Valid duration gets accepted', () => {
      });

      xit('Invalid duration gets filtered out', () => {
      });
    });

    xdescribe('Power validation', () => {
      xit('Valid power gets accepted', () => {
      });

      xit('Invalid power gets filtered out', () => {
      });
    });

    xdescribe('Price validation', () => {
      xit('Valid price gets accepted', () => {
      });

      xit('Invalid price gets filtered out', () => {
      });
    });
  });


});
