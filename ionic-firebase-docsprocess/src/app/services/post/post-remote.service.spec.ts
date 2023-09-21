import { TestBed } from '@angular/core/testing';

import { PostRemoteService } from './post-remote.service';

describe('PostRemoteService', () => {
  let service: PostRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
