import { TestBed, inject } from '@angular/core/testing';

import { OpinionsService } from './opinions.service';

describe('OpinionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpinionsService]
    });
  });

  it('should be created', inject([OpinionsService], (service: OpinionsService) => {
    expect(service).toBeTruthy();
  }));
});
