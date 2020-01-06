import { ExperimentInstanceLoaderService } from './experiment-instance-loader.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: ExperimentInstanceLoaderService', () => {

  let experimentInstanceLoaderService: ExperimentInstanceLoaderService;
  let httpTestingController: HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExperimentInstanceLoaderService],
    });
    experimentInstanceLoaderService = TestBed.get(ExperimentInstanceLoaderService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach( () => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(experimentInstanceLoaderService).toBeTruthy();
  });

  // TODO how to obtain the prosumer data?

});
