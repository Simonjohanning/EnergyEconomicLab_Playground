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
});
