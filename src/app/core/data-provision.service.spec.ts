import { DataProvisionService } from './data-provision.service';
import { TimeRegime } from './data-types/TimeRegime';
import { Coordinates } from './data-types/Coordinates';
import {HttpClient} from '@angular/common/http';

let dataProvService: DataProvisionService;

beforeEach(() => {

  dataProvService = new DataProvisionService();
});

describe('Service: DataProvisionService', () => {
  it('should return correct experiment length', () => {
    DataProvisionService.getExperimentLength().subscribe( length => {
      expect(length).toEqual(120);
    });
  });

  it('should return discrete time regime', () => {
    DataProvisionService.getTimeRegime().subscribe( timeRegime => {
      expect(timeRegime).toEqual(TimeRegime.DISCRETE);
    });
  });

  it('should return 300 as time step length', () => {
    DataProvisionService.getTimeStepLength().subscribe( stepLength => {
      expect(stepLength).toEqual(300);
    });
  });

  it('should return [0.2, 0.2, 0.4] as CO2 price', () => {
    DataProvisionService.getCO2Price().subscribe( co2price => {
      expect(co2price).toEqual( [0.2, 0.2, 0.4]);
    });
  });

  it('should return [0.2, 0.2, 0.4] as gas price', () => {
    DataProvisionService.getGasPrice().subscribe( gasPrice => {
      expect(gasPrice).toEqual( [0.2, 0.2, 0.4]);
    });
  });

  it('should return default as prognosis visibility scheme', () => {
    DataProvisionService.getPrognosisVisibilityScheme().subscribe( progVisScheme => {
      expect(progVisScheme).toEqual('default');
    });
  });

  it('should return default as schedule visibility scheme', () => {
    DataProvisionService.getScheduleVisibilityScheme().subscribe( scheduleVisScheme => {
      expect(scheduleVisScheme).toEqual('default');
    });
  });

  it('should return default as bid visibility scheme', () => {
    DataProvisionService.getBidVisibilityScheme().subscribe( bidVisScheme => {
      expect(bidVisScheme).toEqual('default');
    });
  });

  it('should return role1, if id is lesser than 10', () => {
    DataProvisionService.getRole('9').subscribe( role => {
      expect(role).toEqual('role1');
    });
  });

  it('should return role2, if id is 10 or bigger', () => {
    DataProvisionService.getRole('10').subscribe(role => {
      expect(role).toEqual('role2');
    });
  });

  it('should return 10 as accelleration factor', () => {
    DataProvisionService.getAccellerationFactor().subscribe( accFactor => {
      expect(accFactor).toEqual(10);
    });
  });

  it('should return {2.3, 1.4} as coordinates', () => {
    const x = 2.3;
    const y = 1.4;
    expect(DataProvisionService.getCoordinates()).toEqual( {x, y});
  });

});

