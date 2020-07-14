import { TimeService } from './time.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BidValidationService } from './bid-validation.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ExperimentStateService } from './experiment-state.service';
import { DataProvisionService } from './data-provision.service';
import { of } from 'rxjs';
import { MockEDMService } from './mock-edm.service';

describe('Service: BidValidation', () => {

  let bidValidationService: BidValidationService;
  let httpTestingController: HttpTestingController;
  let experimentStateService: ExperimentStateService;
  let timeService: TimeService;
  let dataProvisionService: DataProvisionService;
  let mockEDMService: MockEDMService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        BidValidationService,
        TimeService,
        DataProvisionService
      ],
    });
    bidValidationService = TestBed.get(BidValidationService);
    timeService = TestBed.get(TimeService);
    experimentStateService = TestBed.get(ExperimentStateService);
    httpTestingController = TestBed.get(HttpTestingController);
    dataProvisionService = TestBed.get(DataProvisionService);
    mockEDMService = TestBed.get(MockEDMService);
  });

  afterEach( () => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('services should be created', () => {
    expect(bidValidationService).toBeTruthy();
    expect(timeService).toBeTruthy();
    expect(experimentStateService).toBeTruthy();
    expect(dataProvisionService).toBeTruthy();
  });

  describe('fitValidator', () => {

    it('input is not within time range or not a number and should thus return null', () => {
      expect(bidValidationService.fitValidator(new FormControl('234'))).toEqual(null);
      expect(bidValidationService.fitValidator(new FormControl('sdfgiwefwe'))).toEqual(null);
    });

    it('when the form time precedes current experiment time respective error message is returned' , () => {
      expect(bidValidationService.fitValidator(new FormControl(timeService.getCurrentTime() - 1))).toEqual(
        { fitIssue: 'Proposed bid timing must lie in the future!'});
    });

    it('when the form time precedes the bid closure time respective error message is returned', () => {
      const experimentID = experimentStateService.experimentID;
      let p2pMarketDescription;
      const value = timeService.getCurrentTime();
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDescription = p2pmd);
      expect(bidValidationService.fitValidator(new FormControl(value))).toEqual(
        { fitIssue: ('Bid horizon for P2P bids are ' + p2pMarketDescription.bidClosure +
            ', whereas the proposed time is only ' + (value - timeService.getCurrentTime()) +
            ' time steps ahead!') });
    });
  });

  describe('durationValidator', () => {

    it('feeding in the time slice length returns null', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      expect(bidValidationService.durationValidator(new FormControl(p2pMarketDesign.timeSliceLength))).toEqual(null);
    });

    it ('input value something other than a multiple of time slice length results in an issue', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      expect(bidValidationService.durationValidator(new FormControl(p2pMarketDesign.timeSliceLength / 2))).
        toEqual({durationIssue: 'Duration of the bid must be a multiple of ' + p2pMarketDesign.timeSliceLength});
    });
  });

  describe('powerValidator', () => {

    it ('input value greater than minimum Bid Size returns null', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      expect(bidValidationService.powerValidator(new FormControl(p2pMarketDesign.minBidSize + 1))).toEqual(null);
    });

    it ('input value equal minimum Bid Size returns null', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      expect(bidValidationService.powerValidator(new FormControl(p2pMarketDesign.minBidSize))).toEqual(null);
    });

    it ('input value smaller than minimum Bid Size returns issue', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      expect(bidValidationService.powerValidator(new FormControl(p2pMarketDesign.minBidSize - 1))).
        toEqual({powerIssue: 'Proposed bid must be at least ' + p2pMarketDesign.minBidSize});
    });
  });

  describe('priceValidator', () => {

    it('no max price given returns null with arbitrary input', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      spyOn(DataProvisionService, 'getP2PMarketDescription').and.returnValue(
        of({
          bidClosure: 3,
          askClosure: 3,
          timeSliceLength: 1,
          minBidSize: 0,
          minAskSize: 0,
          maxPrice: -1,
          feeAmount: 0
        }));
      bidValidationService = new BidValidationService(mockEDMService, dataProvisionService, timeService, experimentStateService);
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      expect(bidValidationService.priceValidator(new FormControl('aedfbwefs'))).toEqual(null);
      expect(bidValidationService.priceValidator(new FormControl(3))).toEqual(null);
    });

    it('input is greater than maximum price value returns price issue when max price is set', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      spyOn(DataProvisionService, 'getP2PMarketDescription').and.returnValue(
        of({
          bidClosure: 3,
          askClosure: 3,
          timeSliceLength: 1,
          minBidSize: 0,
          minAskSize: 0,
          maxPrice: 100,
          feeAmount: 0
        }));
      bidValidationService = new BidValidationService(mockEDMService, dataProvisionService, timeService, experimentStateService);
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      expect(bidValidationService.priceValidator(new FormControl(p2pMarketDesign.maxPrice + 1))).
        toEqual({priceIssue: 'Price cannot exceed ' + p2pMarketDesign.maxPrice + ' Euro/kWh in this market design'});
    });

    it('input value below 0 returns power issue when max price is set', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      spyOn(DataProvisionService, 'getP2PMarketDescription').and.returnValue(
        of({
          bidClosure: 3,
          askClosure: 3,
          timeSliceLength: 1,
          minBidSize: 0,
          minAskSize: 0,
          maxPrice: 100,
          feeAmount: 0
        }));
      bidValidationService = new BidValidationService(mockEDMService, dataProvisionService, timeService, experimentStateService);
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      expect(bidValidationService.priceValidator(new FormControl(-1))).
        toEqual({powerIssue: 'Price has to be larger than 0'});
    });
  });

  describe('checkBidValidity', () => {
    it('valid bid results in true', () => {
      const correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: 2,
        power: 1.5
      };
      expect(bidValidationService.checkBidValidity(correspondingBid)).toEqual(true);
    });

    it('delivery time prior current time or after bid closure results in false', () => {
      let correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: timeService.getCurrentTime() - 1,
        duration: 3,
        price: 2,
        power: 1.5
      };
      expect(bidValidationService.checkBidValidity(correspondingBid)).toEqual(false);
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: timeService.getCurrentTime() + p2pMarketDesign.bidClosure - 1,
        duration: 3,
        price: 2,
        power: 1.5
      };
      console.log(timeService.getCurrentTime() + p2pMarketDesign.bidClosure + ' ' + correspondingBid.deliveryTime);
      expect(bidValidationService.checkBidValidity(correspondingBid)).toEqual(false);
    });

    it('bid duration is not a multiple of timeSliceLength results in false', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      const correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: p2pMarketDesign.timeSliceLength / 2,
        price: 2,
        power: 1.5
      };
      expect(bidValidationService.checkBidValidity(correspondingBid)).toEqual(false);
    });

    it('bid power lesser than minimum bid size results in false', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      const correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: 2,
        power: p2pMarketDesign.minBidSize - 1
      };
      expect(bidValidationService.checkBidValidity(correspondingBid)).toEqual(false);
    });

    it('bid price is greater than maximum price and max price is greater 0 results in false', () => {
      spyOn(DataProvisionService, 'getP2PMarketDescription').and.returnValue(
        of({
          bidClosure: 3,
          askClosure: 3,
          timeSliceLength: 1,
          minBidSize: 0,
          minAskSize: 0,
          maxPrice: 100,
          feeAmount: 0
        }));
      bidValidationService = new BidValidationService(mockEDMService, dataProvisionService, timeService, experimentStateService);
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      const correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: p2pMarketDesign.maxPrice + 1,
        power: 1.5
      };
      expect(bidValidationService.checkBidValidity(correspondingBid)).toEqual(false);
    });

    it('bid price is smaller 0 results in false', () =>  {
      // ((correspondingBid.price < 0) && (correspondingBid.price !== -1)))
      let correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: -2,
        power: 1.5
      };
      expect(bidValidationService.checkBidValidity(correspondingBid)).toEqual(false);
      correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: -1,
        power: 1.5
      };
      expect(bidValidationService.checkBidValidity(correspondingBid)).toEqual(false);
    });

  });

  describe('getBidValidityErrors', () => {
    /*
    getBidValidityErrors(correspondingBid: P2POption): string[] {
    const bidIssues = String[6];
    // check for price issues
    if (this.p2pMarketDesign.maxPrice !== -1) {
      if (correspondingBid.price > this.p2pMarketDesign.maxPrice) {
        bidIssues.push('price issue: Price cannnot exceed ' + this.p2pMarketDesign.maxPrice + ' Euro/kWh in this market design');
      }
      if (correspondingBid.price < 0) {
        bidIssues.push('price issue: Price has to be larger than 0');
      }
    }
    return bidIssues;
  }
     */
    it('checkBidValidity returns true result is null', () => {
      const correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: 2,
        power: 1.5
      };
      expect(bidValidationService.getBidValidityErrors(correspondingBid)).toEqual(null);
    });

    it('should collect feed-in time issues when feed-in time precedes the current time', () => {
      const correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: timeService.getCurrentTime() - 1,
        duration: 2,
        price: 2,
        power: 1.5
      };
      // if feed-in time precedes the current time, it will ALWAYS collect two errors
      expect(bidValidationService.getBidValidityErrors(correspondingBid)).
        toEqual(['feed-in time issue: Proposed bid timing must lie in the future, but lies in the past',
        'feed-in time issue: Bid horizon for P2P bids are 5, whereas the proposed time is only -1 time steps ahead!']);
    });

    it('feed-in time lies between current time and bid closure', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      const correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: timeService.getCurrentTime() + p2pMarketDesign.bidClosure - 1,
        duration: 2,
        price: 2,
        power: 1.5
      };
      // if feed-in time precedes the current time, it will ALWAYS collect two errors
      expect(bidValidationService.getBidValidityErrors(correspondingBid)).
      toEqual(['feed-in time issue: Bid horizon for P2P bids are 5, whereas the proposed time is only ' + (correspondingBid.deliveryTime - timeService.getCurrentTime()) + ' time steps ahead!']);
    });

    it('bid duration has to be a multiple of time slice length', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      const correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: p2pMarketDesign.timeSliceLength / 2,
        price: 2,
        power: 1.5
      };
      expect(bidValidationService.getBidValidityErrors(correspondingBid)).
        toEqual(['duration issue: Duration of the bid must be a multiple of ' + p2pMarketDesign.timeSliceLength]);
    });

    it('bid power needs to be bigger than minimum bid size', () => {
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      const correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: 2,
        power: p2pMarketDesign.minBidSize - 1
      };
      expect(bidValidationService.getBidValidityErrors(correspondingBid)).toEqual(['power issue: Proposed bid must be at least ' + p2pMarketDesign.minBidSize]);
    });

    it('if maximum price on the market is defined the bid price can neither exceed it nor be lesser than 0', () => {
      spyOn(DataProvisionService, 'getP2PMarketDescription').and.returnValue(
        of({
          bidClosure: 3,
          askClosure: 3,
          timeSliceLength: 1,
          minBidSize: 0,
          minAskSize: 0,
          maxPrice: 100,
          feeAmount: 0
        }));
      bidValidationService = new BidValidationService(mockEDMService, dataProvisionService, timeService, experimentStateService);
      let p2pMarketDesign;
      const experimentID = experimentStateService.experimentID;
      DataProvisionService.getP2PMarketDescription(experimentID).subscribe(p2pmd => p2pMarketDesign = p2pmd);
      let correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: p2pMarketDesign.maxPrice + 1,
        power: 1.5
      };
      expect(bidValidationService.getBidValidityErrors(correspondingBid)).toEqual(['price issue: Price cannot exceed ' + p2pMarketDesign.maxPrice + ' Euro/kWh in this market design']);
      correspondingBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: -1,
        power: 1.5
      };
      expect(bidValidationService.getBidValidityErrors(correspondingBid)).toEqual(['price issue: Price has to be larger than 0']);
    });
    // TODO rest results in divers combination of errors - check each single error and a few combinations (order)
  });

});
