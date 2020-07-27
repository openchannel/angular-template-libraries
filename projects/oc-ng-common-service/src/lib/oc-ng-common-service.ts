import { TestBed } from '@angular/core/testing';

import { OcCommonServiceService } from './oc-ng-common-service.service';

describe('OcCommonServiceService', () => {
  let service: OcCommonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcCommonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
