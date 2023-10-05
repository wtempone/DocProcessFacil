import { TestBed } from '@angular/core/testing';

import { RequireDocsRemoteService } from './require-docs-remote.service';

describe('RequireDocsRemoteService', () => {
  let service: RequireDocsRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequireDocsRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
