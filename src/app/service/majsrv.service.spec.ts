import { TestBed, inject } from '@angular/core/testing';

import { MajsrvService } from './majsrv.service';

describe('MajsrvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MajsrvService]
    });
  });

  it('should be created', inject([MajsrvService], (service: MajsrvService) => {
    expect(service).toBeTruthy();
  }));
});
