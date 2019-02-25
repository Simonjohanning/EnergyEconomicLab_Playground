import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import {BidCreatorComponent} from './bid-creator/bid-creator.component';
import {BidDetailComponent} from './bid-detail/bid-detail.component';
import {MarketViewComponent} from './market-view/market-view.component';

@NgModule({
  declarations: [
    ProsumerComponent,
    PersistentResourceDisplayComponent,
    ControllableGenerationPRDComponent,
    NonControllableGenerationPRDComponent,
    LoadPRDComponent,
    StoragePRDComponent,
    FeedInPointDisplayComponent,
    BidCreatorComponent,
    MarketViewComponent,
    MarketEntryComponent,
    MarketComponent,
    BidDetailComponent,
    CommittedTransactionsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CoreModule
  ],
  exports: [
    ControllableGenerationPRDComponent
  ]
})
export class ProsumerModule { }
