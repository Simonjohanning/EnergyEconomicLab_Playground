import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {WelcomeComponent} from './core/welcome/welcome.component';
import {ProsumerComponent} from './prosumer/prosumer.component';
import {PublicActorComponent} from './public-actor/public-actor.component';
import {ResearcherComponent} from './researcher/researcher.component';
import {GridOperatorComponent} from './grid-operator/grid-operator.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TimeComponent} from './core/time/time.component';
import {PersistentResourceDisplayComponent} from './prosumer/persistent-resource-display/persistent-resource-display.component';
import {MarketComponent} from './prosumer/market/market.component';
import {FeedInPointDisplayComponent} from './prosumer/feed-in-point-display/feed-in-point-display.component';
import {ResidualLoadComponent} from './prosumer/residual-load/residual-load.component';
import {ControllableGenerationPRDComponent} from './prosumer/controllable-generation-prd/controllable-generation-prd.component';
import {NonControllableGenerationPRDComponent} from './prosumer/non-controllable-generation-prd/non-controllable-generation-prd.component';
import {LoadPRDComponent} from './prosumer/load-prd/load-prd.component';
import {StoragePRDComponent} from './prosumer/storage-prd/storage-prd.component';
import {P2PBidEditorComponent} from './prosumer/p2p-bid-editor/p2p-bid-editor.component';
import {MarketViewComponent} from './prosumer/market-view/market-view.component';
import {BidDetailComponent} from './prosumer/bid-detail/bid-detail.component';
import {CommittedTransactionsComponent} from './prosumer/committed-transactions/committed-transactions.component';

// import {
//   WelcomeComponent,
//   ProsumerComponent,
//   PublicActorComponent,
//   ResearcherComponent,
//   GridOperatorComponent,
//   routes, AppRoutingModule
// } from 'app-routing.module';

describe('Router: App', () => {

  let router: Router;
  let location: Location;

  beforeEach(( ) => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        WelcomeComponent,
        ProsumerComponent,
        PublicActorComponent,
        ResearcherComponent,
        GridOperatorComponent,
        TimeComponent, PersistentResourceDisplayComponent, MarketComponent, FeedInPointDisplayComponent, ResidualLoadComponent, ControllableGenerationPRDComponent, NonControllableGenerationPRDComponent, LoadPRDComponent, StoragePRDComponent, P2PBidEditorComponent, MarketViewComponent, BidDetailComponent, CommittedTransactionsComponent
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();

  });

  it('navigate to "" redirects you to welcome', fakeAsync( () => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/welcomePage');
  }));

  it('navigate to "welcomePage" redirects you to welcome', fakeAsync( () => {
    router.navigate(['welcomePage']);
    tick();
    expect(location.path()).toBe('/welcomePage');
  }));

  it('navigate to "ProsumerView" redirects you to prosumer', fakeAsync( () => {
    router.navigate(['ProsumerView/3']);
    tick();
    expect(location.path()).toBe('/ProsumerView/3');
  }));

  it('navigate to "PublicActorView" redirects you to public actor', fakeAsync( () => {
    router.navigate(['PublicActorView']);
    tick();
    expect(location.path()).toBe('/PublicActorView');
  }));

  it('navigate to "ExperimentDesignerView" redirects you to experiment designer', fakeAsync( () => {
    router.navigate(['ExperimentDesignerView']);
    tick();
    expect(location.path()).toBe('/ExperimentDesignerView');
  }));

  it('navigate to "GridOperatorView" redirects you to grid operator', fakeAsync( () => {
    router.navigate(['GridOperatorView']);
    tick();
    expect(location.path()).toBe('/GridOperatorView');
  }));
});
