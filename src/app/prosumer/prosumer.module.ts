import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProsumerComponent} from './prosumer.component';
import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import { PersistentResourceDisplayComponent } from './persistent-resource-display/persistent-resource-display.component';
import { ControllableGenerationPRDComponent } from './controllable-generation-prd/controllable-generation-prd.component';
import { NonControllableGenerationPRDComponent } from './non-controllable-generation-prd/non-controllable-generation-prd.component';
import { LoadPRDComponent } from './load-prd/load-prd.component';
import { StoragePRDComponent } from './storage-prd/storage-prd.component';
import { FeedInPointDisplayComponent } from './feed-in-point-display/feed-in-point-display.component';
import {CommittedTransactionsComponent} from './committed-transactions/committed-transactions.component';
import {MarketComponent} from './market/market.component';
import {MarketEntryComponent} from './market-entry/market-entry.component';
import {BidDetailComponent} from './bid-detail/bid-detail.component';
import {MarketViewComponent} from './market-view/market-view.component';
import { P2PBidEditorComponent } from './p2p-bid-editor/p2p-bid-editor.component';
import { ResidualLoadComponent } from './residual-load/residual-load.component';
import { FeedInObligationDisplayComponent } from './feed-in-obligation-display/feed-in-obligation-display.component';
import { FeeLevyDisplayComponent } from '../prosumer/fee-levy-display/fee-levy-display.component';
import { AssetDispatchComponent } from '../prosumer/asset-dispatch/asset-dispatch.component';
import { CGDispatchComponent } from '../prosumer/cgdispatch/cgdispatch.component';
import { StorageDispatchComponent } from '../prosumer/storage-dispatch/storage-dispatch.component';
import { LoadDispatchComponent } from '../prosumer/load-dispatch/load-dispatch.component';

@NgModule({
  declarations: [
    ProsumerComponent,
    PersistentResourceDisplayComponent,
    ControllableGenerationPRDComponent,
    NonControllableGenerationPRDComponent,
    LoadPRDComponent,
    StoragePRDComponent,
    FeedInPointDisplayComponent,
    MarketViewComponent,
    MarketEntryComponent,
    MarketComponent,
    BidDetailComponent,
    CommittedTransactionsComponent,
    P2PBidEditorComponent,
    ResidualLoadComponent,
    FeedInObligationDisplayComponent,
    FeeLevyDisplayComponent,
    AssetDispatchComponent,
    CGDispatchComponent,
    StorageDispatchComponent,
    LoadDispatchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule
  ],
  exports: [
    ControllableGenerationPRDComponent
  ]
})
export class ProsumerModule { }
