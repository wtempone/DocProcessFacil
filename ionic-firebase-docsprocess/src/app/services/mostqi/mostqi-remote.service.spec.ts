import { TestBed } from '@angular/core/testing';

import { MostqiRemoteService } from './mostqi-remote.service';

describe('MostqiRemoteService', () => {
  let service: MostqiRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostqiRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
