import { AskDetailComponent } from './ask-detail.component';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { BlockchainTransactionService } from '../../core/blockchain-transaction.service';
import { ExperimentStateService } from '../../core/experiment-state.service';
import { TimeService } from '../../core/time.service';

describe('AskDetail', () => {
  let askDetailComponent: AskDetailComponent;
  let fixture: ComponentFixture<AskDetailComponent>;
  let timeService: TimeService;
  let testBedTimeService: TimeService;
  let experimentStateService: ExperimentStateService;
  let testBedExperimentStateService: ExperimentStateService;
  let blockchainTransactionService: BlockchainTransactionService;
  let testBedBlockchainTransactionService: BlockchainTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskDetailComponent],
      providers: [
        BlockchainTransactionService,
        ExperimentStateService,
        TimeService
      ]
    });
    fixture = TestBed.createComponent(AskDetailComponent);
    fixture.detectChanges();
    askDetailComponent = fixture.componentInstance;

    testBedExperimentStateService = TestBed.get(ExperimentStateService);
    experimentStateService = fixture.debugElement.injector.get(ExperimentStateService);

    testBedBlockchainTransactionService = TestBed.get(BlockchainTransactionService);
    blockchainTransactionService = fixture.debugElement.injector.get(BlockchainTransactionService);

    testBedTimeService = TestBed.get(TimeService);
    timeService = fixture.debugElement.injector.get(TimeService);

  });

  it('component exists', () => {
    expect(askDetailComponent).toBeTruthy();
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

  it('sell function calls function of BlockchainTransactionService', () => {
    const spy = spyOn(blockchainTransactionService, 'commitToP2PAsk');
    askDetailComponent.sell();
    expect(spy).toHaveBeenCalled();
  });
});
