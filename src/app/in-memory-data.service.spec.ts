import { InMemoryDataService } from './in-memory-data.service';
import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

describe('Service: InMemoryData', () => {
  let http: HttpClient;
  let service: InMemoryDataService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
      ],
      providers: [InMemoryDataService]
    });
    TestBed.compileComponents();
    service = TestBed.get(InMemoryDataService);
    service.createDb();
    http = TestBed.get(HttpClient);
  });

  // the data SHOULD be available under '/prosumers', yet it returns true for any possible datatype
  xit('should return the prosumers list', () => {
    http.get('/prosumers').subscribe(prosumer => {
      expect(prosumer).toEqual({id: 11, name: 'Mr. Nice'});
    });

  });
});
