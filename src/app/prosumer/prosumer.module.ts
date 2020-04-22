import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProsumerComponent } from './prosumer.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core-module';
import { PersistentResourceDisplayComponent } from './persistent-resource-display/persistent-resource-display.component';
import { ControllableGenerationPRDComponent } from './controllable-generation-prd/controllable-generation-prd.component';
import { NonControllableGenerationPRDComponent } from './non-controllable-generation-prd/non-controllable-generation-prd.component';
import { LoadPRDComponent } from './load-prd/load-prd.component';
import { StoragePRDComponent } from './storage-prd/storage-prd.component';
import { FeedInPointDisplayComponent } from './feed-in-point-display/feed-in-point-display.component';
import { CommittedTransactionsComponent } from './committed-transactions/committed-transactions.component';
import { BidDetailComponent } from './bid-detail/bid-detail.component';
import { MarketViewComponent } from './market-view/market-view.component';
import { P2PBidEditorComponent } from './p2p-bid-editor/p2p-bid-editor.component';
import { ResidualLoadComponent } from './residual-load/residual-load.component';
import { FeedInObligationDisplayComponent } from './feed-in-obligation-display/feed-in-obligation-display.component';
import { FeeLevyDisplayComponent } from './fee-levy-display/fee-levy-display.component';
import { AssetDispatchComponent } from './asset-dispatch/asset-dispatch.component';
import { CGDispatchComponent } from './cgdispatch/cgdispatch.component';
import { StorageDispatchComponent } from './storage-dispatch/storage-dispatch.component';
import { LoadDispatchComponent } from './load-dispatch/load-dispatch.component';
import { TransactionClearingService } from '../core/transaction-clearing.service';
import { BlockchainTransactionService } from '../core/blockchain-transaction.service';
import { ExogeneousPricesComponent } from './exogeneous-prices/exogeneous-prices.component';
import { BidViewComponent } from './bid-view/bid-view.component';

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
        BidDetailComponent,
        CommittedTransactionsComponent,
        P2PBidEditorComponent,
        ResidualLoadComponent,
        FeedInObligationDisplayComponent,
        FeeLevyDisplayComponent,
        AssetDispatchComponent,
        CGDispatchComponent,
        StorageDispatchComponent,
        LoadDispatchComponent,
        ExogeneousPricesComponent,
        BidViewComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule
  ],
  exports: [
    ControllableGenerationPRDComponent
  ],
  providers: [
    BlockchainTransactionService,
    TransactionClearingService
  ]
})
export class ProsumerModule { }
