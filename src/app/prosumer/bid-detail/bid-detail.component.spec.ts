import { BidDetailComponent } from './bid-detail.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockchainTransactionService } from '../../core/blockchain-transaction.service';
import { ExperimentStateService } from '../../core/experiment-state.service';
import { TimeService } from '../../core/time.service';
import { inject } from '@angular/core/testing';
import { DataProvisionService } from '../../core/data-provision.service';

describe('BidDetail', () => {
  let bidDetailComponent: BidDetailComponent;
  let fixture: ComponentFixture<BidDetailComponent>;
  let timeService: TimeService;
  let testBedTimeService: TimeService;
  let experimentStateService: ExperimentStateService;
  let testBedExperimentStateService: ExperimentStateService;
  let blockchainTransactionService: BlockchainTransactionService;
  let testBedBlockchainTransactionService: BlockchainTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BidDetailComponent],
      providers: [
        BlockchainTransactionService,
        ExperimentStateService,
        TimeService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(BidDetailComponent);
    bidDetailComponent = fixture.componentInstance;
    const dataProvisionService = new DataProvisionService();
    bidDetailComponent.bid = {
      id: 1,
      optionCreator: dataProvisionService.getMockProsumerInstance(),
      deliveryTime: 81,
      duration: 2,
      price: 2,
      power: 1.5
    };
    fixture.detectChanges();

    testBedExperimentStateService = TestBed.get(ExperimentStateService);
    experimentStateService = fixture.debugElement.injector.get(ExperimentStateService);

    testBedBlockchainTransactionService = TestBed.get(BlockchainTransactionService);
    blockchainTransactionService = fixture.debugElement.injector.get(BlockchainTransactionService);

    testBedTimeService = TestBed.get(TimeService);
    timeService = fixture.debugElement.injector.get(TimeService);

  });

  it('component exists', () => {
    expect(bidDetailComponent).toBeTruthy();
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
  });

  it('purchase function calls function of BlockchainTransactionService', () => {
    const spyBTS = spyOn(blockchainTransactionService, 'commitToP2PBid');
    bidDetailComponent.purchase();
    expect(spyBTS).toHaveBeenCalled();
  });
});
