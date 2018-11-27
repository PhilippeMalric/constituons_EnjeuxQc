import { TestBed, inject } from '@angular/core/testing';

import { EnjeuxService } from './enjeux.service';

describe('EnjeuxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnjeuxService]
    });
  });

  it('should be created', inject([EnjeuxService], (service: EnjeuxService) => {
    expect(service).toBeTruthy();
  }));
});
