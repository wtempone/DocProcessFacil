import { TestBed } from '@angular/core/testing';

import { PostLocalService } from './post-local.service';

describe('PostLocalService', () => {
  let service: PostLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
