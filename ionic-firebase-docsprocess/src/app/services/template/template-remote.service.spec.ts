import { TestBed } from '@angular/core/testing';

import { TemplateRemoteService } from './template-remote.service';

describe('TemplateRemoteService', () => {
  let service: TemplateRemoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateRemoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
