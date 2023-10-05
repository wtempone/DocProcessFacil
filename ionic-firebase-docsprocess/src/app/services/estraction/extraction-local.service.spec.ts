import { TestBed } from '@angular/core/testing';

import { ExtractionLocalService } from './extraction-local.service';

describe('ExtractionLocalService', () => {
  let service: ExtractionLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtractionLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
