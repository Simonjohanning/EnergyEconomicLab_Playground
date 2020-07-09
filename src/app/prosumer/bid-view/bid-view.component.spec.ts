import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {TimeService} from '../../core/time.service';
import {ExperimentStateService} from '../../core/experiment-state.service';
import {DataProvisionService} from '../../core/data-provision.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BidViewComponent} from './bid-view.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BidDetailComponent} from '../bid-detail/bid-detail.component';
import {By} from '@angular/platform-browser';

describe('BidViewComponent', () => {

  let fixture: ComponentFixture<BidViewComponent>;
  let component: BidViewComponent;
  let blockchainTransactionService: BlockchainTransactionService;
  let testBedBlockchainTransactionService: BlockchainTransactionService;
  let timeService: TimeService;
  let testBedTimeService: TimeService;
  let experimentStateService: ExperimentStateService;
  let testBedExperimentStateService: ExperimentStateService;
  let dataProvisionService: DataProvisionService;
  let testBedDataProvisionService: DataProvisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BidViewComponent,
        BidDetailComponent
      ],
      providers: [
        BlockchainTransactionService,
        TimeService,
        ExperimentStateService,
        DataProvisionService
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });

    fixture = TestBed.createComponent(BidViewComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    testBedExperimentStateService = TestBed.get(ExperimentStateService);
    experimentStateService = fixture.debugElement.injector.get(ExperimentStateService);

    testBedTimeService = TestBed.get(TimeService);
    timeService = fixture.debugElement.injector.get(TimeService);

    testBedBlockchainTransactionService = TestBed.get(BlockchainTransactionService);
    blockchainTransactionService = fixture.debugElement.injector.get(BlockchainTransactionService);

    testBedDataProvisionService = TestBed.get(DataProvisionService);
    dataProvisionService = fixture.debugElement.injector.get(DataProvisionService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('services are imported correctly', () => {

    it('ExperimentStateService injected via inject(...) and TestBed.get(...) should be of same instance as ExperimentStateService', () => {
      inject([ExperimentStateService], (injectService: ExperimentStateService) => {
        expect(injectService).toBe(testBedExperimentStateService);
      });
    });

    it('TimeService injected via inject(...) and TestBed.get(...) should be of same instance as TimeService', () => {
      inject([TimeService], (injectService: TimeService) => {
        expect(injectService).toBe(testBedTimeService);
      });
    });

    it('BlockchainTransactionService injected via inject(...) and TestBed.get(...) should be of same instance as BlockchainTransactionService', () => {
      inject([BlockchainTransactionService], (injectService: BlockchainTransactionService) => {
        expect(injectService).toBe(testBedBlockchainTransactionService);
      });
    });

    it('DataProvisionService injected via inject(...) and TestBed.get(...) should be of same instance as DataProvisionService', () => {
      inject([DataProvisionService], (injectService: DataProvisionService) => {
        expect(injectService).toBe(testBedDataProvisionService);
      });
    });
  });

  describe('testing input values and filter behavior', () => {
    it('for no filter input the initial number of offered bids is equal the number of bids in the data provision service', () => {
      const numberOfOfferedBids = dataProvisionService.getMockBids().length;
      expect(fixture.debugElement.nativeElement.querySelectorAll('#bids').length).toEqual(numberOfOfferedBids);
    });

    it('filtering out first bid by max price results in fewer offered bids', () => {
      const firstBid = dataProvisionService.getMockBids().values().next().value;

      const elMaxPrice = fixture.debugElement.query(By.css('#maxPrice')).nativeElement;
      elMaxPrice.value = firstBid.price - 1; // maxPrice filter should filter out first bid as max price is now below its price, maybe both
      elMaxPrice.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#bids').length).toBeLessThan(dataProvisionService.getMockBids().length);
    });

    it('filtering out first bid by min feed in time results in fewer offered bids', () => {
      const firstBid = dataProvisionService.getMockBids().values().next().value;

      const elMinFeedInTime = fixture.debugElement.query(By.css('#minFeedInTime')).nativeElement;
      elMinFeedInTime.value = firstBid.deliveryTime + 1;
      elMinFeedInTime.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#bids').length).toBeLessThan(dataProvisionService.getMockBids().length);
    });

    it('filtering out first bid by max feed in time results in fewer offered bids', () => {
      const firstBid = dataProvisionService.getMockBids().values().next().value;

      const elMaxFeedInTime = fixture.debugElement.query(By.css('#maxFeedInTime')).nativeElement;
      elMaxFeedInTime.value = firstBid.deliveryTime - 1;
      elMaxFeedInTime.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#bids').length).toBeLessThan(dataProvisionService.getMockBids().length);
    });

    it('filtering out first bid by min duration results in fewer offered bids', () => {
      const firstBid = dataProvisionService.getMockBids().values().next().value;

      const elMinDuration = fixture.debugElement.query(By.css('#minDuration')).nativeElement;
      elMinDuration.value = firstBid.duration + 1;
      elMinDuration.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#bids').length).toBeLessThan(dataProvisionService.getMockBids().length);
    });

    it('filtering out first bid by maximum duration results in fewer offered bids', () => {
      const firstBid = dataProvisionService.getMockBids().values().next().value;

      const elMaxDuration = fixture.debugElement.query(By.css('#maxDuration')).nativeElement;
      elMaxDuration.value = firstBid.duration - 1;
      elMaxDuration.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#bids').length).toBeLessThan(dataProvisionService.getMockBids().length);
    });

    it('filtering out first bid by min power results in fewer offered bids', () => {
      const firstBid = dataProvisionService.getMockBids().values().next().value;

      const elMinPower = fixture.debugElement.query(By.css('#minPower')).nativeElement;
      elMinPower.value = firstBid.power + 1;
      elMinPower.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#bids').length).toBeLessThan(dataProvisionService.getMockBids().length);
    });

    it('filtering out first bid by maximum power results in fewer offered bids', () => {
      const firstBid = dataProvisionService.getMockBids().values().next().value;

      const elMaxPower = fixture.debugElement.query(By.css('#maxPower')).nativeElement;
      elMaxPower.value = firstBid.power - 1;
      elMaxPower.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#bids').length).toBeLessThan(dataProvisionService.getMockBids().length);
    });
  });

  it('clicking on a bid results in function call', () => {
    const spy = spyOn(component, 'setSelectedBid');
    const element = fixture.debugElement.query(By.css('#bidss'));
    element.triggerEventHandler('click', {});

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
