import { TestBed } from '@angular/core/testing';

import { TemplateLocalService } from './template-local.service';

describe('TemplateLocalService', () => {
  let service: TemplateLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
