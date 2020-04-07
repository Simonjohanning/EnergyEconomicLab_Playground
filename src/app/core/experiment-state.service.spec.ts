
import {ExperimentStateService} from './experiment-state.service';
import {DataProvisionService} from './data-provision.service';

describe('ExperimentStateService', () => {
  let experimentStateService: ExperimentStateService;

  beforeEach( () => {
    experimentStateService = new ExperimentStateService();
  });

  xit('current prosumer should be the first prosumer created in the data provision service', () => {
    DataProvisionService.getProsumerData(1).subscribe(prosumerInstance => {
      expect(experimentStateService.getCurrentProsumer()).toEqual(prosumerInstance);
    });
  });

  it('set current prosumer should accept new prosumer if it was different than the one in storage', () => {
    DataProvisionService.getProsumerData(1).subscribe(prosumerInstance => {
      expect(experimentStateService.setCurrentProsumer(prosumerInstance)).toEqual(true);
    });
  });

});
