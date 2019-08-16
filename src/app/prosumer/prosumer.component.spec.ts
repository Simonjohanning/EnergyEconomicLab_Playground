import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsumerComponent } from './prosumer.component';
import {CoreModule} from '../core/core.module';
import {PersistentResourceDisplayComponent} from './persistent-resource-display/persistent-resource-display.component';
import {FeedInPointDisplayComponent} from './feed-in-point-display/feed-in-point-display.component';
import {ResidualLoadComponent} from './residual-load/residual-load.component';
import {ControllableGenerationPRDComponent} from './controllable-generation-prd/controllable-generation-prd.component';
import {NonControllableGenerationPRDComponent} from './non-controllable-generation-prd/non-controllable-generation-prd.component';
import {LoadPRDComponent} from './load-prd/load-prd.component';
import {StoragePRDComponent} from './storage-prd/storage-prd.component';
import {P2PBidEditorComponent} from './p2p-bid-editor/p2p-bid-editor.component';
import {MarketViewComponent} from './market-view/market-view.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BidDetailComponent} from './bid-detail/bid-detail.component';
import {CommittedTransactionsComponent} from './committed-transactions/committed-transactions.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ProsumerComponent', () => {
  let component: ProsumerComponent;
  let fixture: ComponentFixture<ProsumerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      declarations: [ ProsumerComponent, PersistentResourceDisplayComponent, FeedInPointDisplayComponent,
        ResidualLoadComponent, ControllableGenerationPRDComponent, NonControllableGenerationPRDComponent, LoadPRDComponent,
        StoragePRDComponent, P2PBidEditorComponent, MarketViewComponent, BidDetailComponent, CommittedTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('Prosumer information is displayed correctly', () => {
    xit('Prosumer name is displayed correctly', () => {

    });

    xit('Prosumer id is displayed correctly', () => {

    });

    xit('nothing is displayed while waiting on Prosumer', () => {

    });
  });

  xdescribe('Prosumer gets infered correctly from path', () => {

  });

  xdescribe('Experiment information is displayed correctly', () => {
    xit('Experiment id is displayed correctly', () => {

    });

    xit('nothing is displayed while waiting on experiment', () => {

    });
  });

  xdescribe('Time elements are displayed correctly', () => {

  });

  xdescribe('PRD are displayed correctly', () => {
    xit('Toggle works properly', () => {

    });

    xit('PRD element works propertly', () => {

    });
  });

  xdescribe('Market view is displayed correctly', () => {

  });
});
