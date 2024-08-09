import { TestBed } from '@angular/core/testing';

import { HttpCancelServiceService } from './http-cancel-service.service';

describe('HttpCancelServiceService', () => {
  let service: HttpCancelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCancelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
