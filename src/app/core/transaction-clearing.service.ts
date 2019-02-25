import { Injectable } from '@angular/core';
import {BlockchainTransactionService} from './blockchain-transaction.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionClearingService {

  constructor(private bts: BlockchainTransactionService) { }
}
