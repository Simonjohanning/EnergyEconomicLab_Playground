import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { PublicActorComponent } from './public-actor.component';
import { ExperimentStateService } from '../core/experiment-state.service';
import { DataProvisionService } from '../core/data-provision.service';
import { TransactionFeeEntry } from '../core/data-types/TransactionFeeEntry';
import { ProsumerInstance } from '../core/data-types/ProsumerInstance';
import { P2POption } from '../core/data-types/P2POption';
import {Prosumer} from '../core/data-types/Prosumer';
import {By} from '@angular/platform-browser';

class MockEmptyDataProvisionService extends DataProvisionService {
  getMockPublicActorData(): Set<TransactionFeeEntry> {
    return new Set<TransactionFeeEntry>();
  }
}

class MockDataProvisionService extends DataProvisionService {
  getMockPublicActorData() {
    const prosumerInstance = new ProsumerInstance(
      new Prosumer(11, 'Prosumer2'),
      [],
      [],
      [],
      [],
      DataProvisionService.getCoordinates(),
      100
    );

    const currentBid: P2POption = {
      id: 1,
      optionCreator: prosumerInstance,
      deliveryTime: 81,
      duration: 3,
      price: 2,
      power: 1.5
    };
    const entry = {payer: prosumerInstance, amount: 2, correspondingTransaction: currentBid};
    const feeEntries = new Set<TransactionFeeEntry>();
    feeEntries.add(entry);
    return feeEntries;
  }
}

class MockExperimentStateService extends ExperimentStateService {
  experimentID = 123456;
}

describe('Component: PublicActor', () => {
  let publicActorComponent: PublicActorComponent;
  let fixture: ComponentFixture<PublicActorComponent>;
  let testBedDataProvisionService: DataProvisionService;
  let publicActorDataProvisionService: MockDataProvisionService;
  let testBedExperimentStateService: ExperimentStateService;
  let publicActorComponentExperimentStateService: ExperimentStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicActorComponent ],
      providers: [
        DataProvisionService,
        ExperimentStateService,
      ]
    });

    TestBed.overrideComponent(
      PublicActorComponent,
      {
        set: {providers: [
          {provide: DataProvisionService, useClass: MockDataProvisionService},
          {provide: ExperimentStateService, useClass: MockExperimentStateService}
          ]}});
    // create component and test fixture
    fixture = TestBed.createComponent(PublicActorComponent);
    fixture.detectChanges();

    // get test component from the fixture
    publicActorComponent = fixture.componentInstance;

    // DataProvisionService provided to the TestBed
    testBedDataProvisionService = TestBed.get(DataProvisionService);

    // DataProvisionService provided by the PublicActorComponent (should return MockDataProvisionService)
    publicActorDataProvisionService = fixture.debugElement.injector.get(DataProvisionService);

    // ExperimentStateService provided to the TestBed
    testBedExperimentStateService = TestBed.get(ExperimentStateService);

    // ExperimentStateService provided by the PublicActorComponent (should return MockExperimentStateService)
    publicActorComponentExperimentStateService = fixture.debugElement.injector.get(ExperimentStateService);
  });

  it('should create', () => {
    expect(publicActorComponent).toBeTruthy();
  });

  describe('Services are injected correctly', () => {
    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
      inject([DataProvisionService], (injectService: DataProvisionService) => {
        expect(injectService).toBe(testBedDataProvisionService);
      })
    );

    it('Service injected via component should be an instance of MockExperimentStateService', () => {
      expect(publicActorDataProvisionService instanceof MockDataProvisionService).toBeTruthy();
    });

    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
      inject([ExperimentStateService], (injectService: ExperimentStateService) => {
        expect(injectService).toBe(testBedExperimentStateService);
      })
    );

    it('Service injected via component should be an instance of MockExperimentStateService', () => {
      expect(publicActorComponentExperimentStateService instanceof MockExperimentStateService).toBeTruthy();
    });
  });

  describe('Non-empty transmitted fees', () => {
    it('Experiment id is displayed correctly', () => {
      const eID = 'Public Actor View for experiment # ' + publicActorComponentExperimentStateService.experimentID;
      const description = fixture.debugElement.query(By.css('#generalDescription'));
      expect(description.nativeElement.textContent.trim()).toBe(eID);
    });

    describe('Individual transactions are displayed correctly', () => {

      it('Payer id is shown correctly', () => {
        expect(publicActorDataProvisionService).toBeTruthy();
        const feeEntry = publicActorDataProvisionService.getMockPublicActorData().values().next().value;
        const el = fixture.debugElement.query(By.css('#payerID'));
        expect(el.nativeElement.textContent.trim()).toEqual(feeEntry.payer.respectiveProsumer.id + '');
      });

      it('Amount is shown correctly', () => {
        expect(publicActorDataProvisionService).toBeTruthy();
        const feeEntry = publicActorDataProvisionService.getMockPublicActorData().values().next().value;
        const el = fixture.debugElement.query(By.css('#amount'));
        expect(el.nativeElement.textContent.trim()).toEqual(feeEntry.amount + '');
      });

      it('ID of corresponding bid is shown correctly', () => {
        expect(publicActorDataProvisionService).toBeTruthy();
        const feeEntry = publicActorDataProvisionService.getMockPublicActorData().values().next().value;
        const el = fixture.debugElement.query(By.css('#transactionID'));
        expect(el.nativeElement.textContent.trim()).toEqual(feeEntry.correspondingTransaction.id + '');
      });
    });
  });
});

describe('Public Actor Component: use empty Set of TransactionFees', () => {
  let publicActorComponent: PublicActorComponent;
  let fixture: ComponentFixture<PublicActorComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicActorComponent ],
      providers: [
        DataProvisionService,
        ExperimentStateService,
      ]
    });

    TestBed.overrideComponent(
      PublicActorComponent,
      {
        set: {providers: [
            {provide: DataProvisionService, useClass: MockEmptyDataProvisionService},
            {provide: ExperimentStateService, useClass: MockExperimentStateService}
          ]}});

    fixture = TestBed.createComponent(PublicActorComponent);
    fixture.detectChanges();
    // get test component from the fixture
    publicActorComponent = fixture.componentInstance;
  });

  it('should create', () => {
    expect(publicActorComponent).toBeTruthy();
  });

  it ('no fee data, set has to be empty', () => {

    const description = fixture.debugElement.query(By.css('div'));
    expect(description.nativeElement.textContent.trim()).toEqual('No transactions occurred yet');
  });
});
