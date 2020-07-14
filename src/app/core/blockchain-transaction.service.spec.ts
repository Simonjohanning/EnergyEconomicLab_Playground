import {BidValidationService} from './bid-validation.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ExperimentStateService} from './experiment-state.service';
import {TimeService} from './time.service';
import {DataProvisionService} from './data-provision.service';
import {MockEDMService} from './mock-edm.service';
import {TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {TransactionClearingService} from './transaction-clearing.service';
import {BlockchainTransactionService} from './blockchain-transaction.service';
import {P2POption} from './data-types/P2POption';

describe('Blockchain Transaction Service: ', () => {

  let bidValidationService: BidValidationService;
  let httpTestingController: HttpTestingController;
  let experimentStateService: ExperimentStateService;
  let timeService: TimeService;
  let dataProvisionService = new DataProvisionService();
  let mockEDMService: MockEDMService;
  let transactionClearingService: TransactionClearingService;
  let blockchainTransactionService: BlockchainTransactionService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        BidValidationService,
        TimeService,
        DataProvisionService,
        MockEDMService,
        TransactionClearingService
      ],
    });
    blockchainTransactionService = TestBed.get(BlockchainTransactionService);
    bidValidationService = TestBed.get(BidValidationService);
    timeService = TestBed.get(TimeService);
    experimentStateService = TestBed.get(ExperimentStateService);
    httpTestingController = TestBed.get(HttpTestingController);
    mockEDMService = TestBed.get(MockEDMService);
    transactionClearingService = TestBed.get(TransactionClearingService);
  });

  describe('commitments should always return true as long as the datatype are correct', () => {
    it('commitment to bid returns true', () => {
      const committedBid = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: 2,
        power: 1.5
      };
      expect(blockchainTransactionService.commitToP2PBid(dataProvisionService.getMockProsumerInstance(), 1, committedBid)).toEqual(true);
      expect(blockchainTransactionService.commitToP2PAsk(dataProvisionService.getMockProsumerInstance(), 1, committedBid)).toEqual(true);
    });
  });

  describe('committed peer-to-peer options can be correctly retrieved', () => {
    const p2pOptionArray = new Array<P2POption>();
    it('there are no committed peer-to-peer options in the beginning of the experiment', () =>  {
      expect(blockchainTransactionService.getCommitedBids()).toEqual(p2pOptionArray);
      expect(blockchainTransactionService.getCommitedAsks()).toEqual(p2pOptionArray);
    });
    it('after committing to a peer-to-peer option to asks or bids, they show up int the respective array', () => {
      const committedOption = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: 2,
        power: 1.5
      };
      blockchainTransactionService.commitToP2PBid(dataProvisionService.getMockProsumerInstance(), 1, committedOption);
      p2pOptionArray.push(committedOption);
      expect(blockchainTransactionService.getCommitedBids()).toEqual(p2pOptionArray);
      blockchainTransactionService.commitToP2PAsk(dataProvisionService.getMockProsumerInstance(), 1, committedOption);
      expect(blockchainTransactionService.getCommitedAsks()).toEqual(p2pOptionArray);
    });
  });

  /*
public getOpenBids(): P2POption[] { return this.openBids; }
public getOpenAsks(): P2POption[] { return this.openAsks; }
 */
  describe('open peer-to-peer options', () => {
    const openBids = dataProvisionService.getMockBids();
    const openAsks = dataProvisionService.getMockAsks();

    it('in the beginning of the experiment the open options are the same es in the data provision service', () => {
      expect(blockchainTransactionService.getOpenBids()).toEqual(openBids);
      expect(blockchainTransactionService.getOpenAsks()).toEqual(openAsks);
    });

    xit('after committing to an option it is removed from the open options', () => {
      const committedOption = {
        id: 1,
        optionCreator: dataProvisionService.getMockProsumerInstance(),
        deliveryTime: 81,
        duration: 2,
        price: 2,
        power: 1.5
      };
      blockchainTransactionService.commitToP2PBid(dataProvisionService.getMockProsumerInstance(), 1, committedOption);
      // openBids.slice(0, openBids.indexOf(committedOption)).concat(openBids.slice(openBids.indexOf(committedOption) + 1, openBids.length));
      expect(blockchainTransactionService.getOpenBids().length).toEqual(openBids.length - 1);
    });
  });

  /*
  getUnusedBidID
  getUnusedAskID

  submitBid
  submitAsk  vs commitToP2PBid
   */
});
