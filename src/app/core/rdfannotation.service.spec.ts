import { TestBed } from '@angular/core/testing';

import { RDFAnnotationService } from './rdfannotation.service';

describe('RDFAnnotationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RDFAnnotationService = TestBed.get(RDFAnnotationService);
    expect(service).toBeTruthy();
  });
});
