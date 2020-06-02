import { InMemoryDataService } from './in-memory-data.service';
import {TestBed} from '@angular/core/testing';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {Prosumer} from './core/data-types/Prosumer';

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
  it('should return the prosumers list', () => {
    http.get('/prosumers').subscribe(prosumer  => {
      expect(prosumer).toBeTruthy();
      expect(prosumer).toBe(Array);
      expect(prosumer).toBe(Prosumer);
      expect(prosumer).toEqual({ id: 11, name: 'Mr. Nice' });
    });
  });
});
