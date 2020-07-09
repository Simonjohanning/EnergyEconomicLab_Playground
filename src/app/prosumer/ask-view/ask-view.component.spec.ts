import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {DataProvisionService} from '../../core/data-provision.service';
import {ExperimentStateService} from '../../core/experiment-state.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BlockchainTransactionService} from '../../core/blockchain-transaction.service';
import {TimeService} from '../../core/time.service';
import {AskViewComponent} from './ask-view.component';
import {AskDetailComponent} from '../ask-detail/ask-detail.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {P2POption} from '../../core/data-types/P2POption';

describe('AskViewComponent', () => {
  let fixture: ComponentFixture<AskViewComponent>;
  let component: AskViewComponent;
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
        AskViewComponent,
        AskDetailComponent
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

    fixture = TestBed.createComponent(AskViewComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    testBedExperimentStateService = TestBed.get(ExperimentStateService);
    experimentStateService = fixture.debugElement.injector.get(ExperimentStateService);

    testBedDataProvisionService = TestBed.get(DataProvisionService);
    dataProvisionService = fixture.debugElement.injector.get(DataProvisionService);

    testBedTimeService = TestBed.get(TimeService);
    timeService = fixture.debugElement.injector.get(TimeService);

    testBedBlockchainTransactionService = TestBed.get(BlockchainTransactionService);
    blockchainTransactionService = fixture.debugElement.injector.get(BlockchainTransactionService);
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
    it('for no filter input the initial number of offered asks is equal the number of asks in the data provision service', () => {
      const numberOfOfferedAsks = dataProvisionService.getMockAsks().length;
      expect(fixture.debugElement.nativeElement.querySelectorAll('#asks').length).toEqual(numberOfOfferedAsks);
    });

    it('filtering out first ask by max price results in fewer offered asks', () => {
      const firstAsk = dataProvisionService.getMockAsks().values().next().value;

      const elMaxPrice = fixture.debugElement.query(By.css('#maxPrice')).nativeElement;
      elMaxPrice.value = firstAsk.price - 1; // maxPrice filter should filter out first ask as max price is now below its price, maybe both
      elMaxPrice.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#asks').length).toBeLessThan(dataProvisionService.getMockAsks().length);
    });

    it('filtering out first ask by min feed out time results in fewer offered asks', () => {
      const firstAsk = dataProvisionService.getMockAsks().values().next().value;

      const elMinFeedOutTime = fixture.debugElement.query(By.css('#minFeedOutTime')).nativeElement;
      elMinFeedOutTime.value = firstAsk.deliveryTime + 1;
      elMinFeedOutTime.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#asks').length).toBeLessThan(dataProvisionService.getMockAsks().length);
    });

    it('filtering out first ask by max feed out time results in fewer offered asks', () => {
      const firstAsk = dataProvisionService.getMockAsks().values().next().value;

      const elMaxFeedOutTime = fixture.debugElement.query(By.css('#maxFeedOutTime')).nativeElement;
      elMaxFeedOutTime.value = firstAsk.deliveryTime - 1;
      elMaxFeedOutTime.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#asks').length).toBeLessThan(dataProvisionService.getMockAsks().length);
    });

    it('filtering out first ask by min duration results in fewer offered asks', () => {
      const firstAsk = dataProvisionService.getMockAsks().values().next().value;

      const elMinDuration = fixture.debugElement.query(By.css('#minDuration')).nativeElement;
      elMinDuration.value = firstAsk.duration + 1;
      elMinDuration.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#asks').length).toBeLessThan(dataProvisionService.getMockAsks().length);
    });

    it('filtering out first ask by maximum duration results in fewer offered asks', () => {
      const firstAsk = dataProvisionService.getMockAsks().values().next().value;

      const elMaxDuration = fixture.debugElement.query(By.css('#maxDuration')).nativeElement;
      elMaxDuration.value = firstAsk.duration - 1;
      elMaxDuration.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#asks').length).toBeLessThan(dataProvisionService.getMockAsks().length);
    });

    it('filtering out first ask by min power results in fewer offered asks', () => {
      const firstAsk = dataProvisionService.getMockAsks().values().next().value;

      const elMinPower = fixture.debugElement.query(By.css('#minPower')).nativeElement;
      elMinPower.value = firstAsk.power + 1;
      elMinPower.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#asks').length).toBeLessThan(dataProvisionService.getMockAsks().length);
    });

    it('filtering out first ask by maximum power resulsts in fewer offered asks', () => {
      const firstAsk = dataProvisionService.getMockAsks().values().next().value;

      const elMaxPower = fixture.debugElement.query(By.css('#maxPower')).nativeElement;
      elMaxPower.value = firstAsk.power - 1;
      elMaxPower.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.querySelectorAll('#asks').length).toBeLessThan(dataProvisionService.getMockAsks().length);
    });
  });

  it('clicking on an ask results in fuction call', () => {
    const spy = spyOn(component, 'setSelectedAsk');
    const element = fixture.debugElement.query(By.css('#asks'));
    element.triggerEventHandler('click', {});

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});

