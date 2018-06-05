import { TestBed, inject } from '@angular/core/testing';

import { SessionFormationService } from './session-formation.service';

describe('SessionFormationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionFormationService]
    });
  });

  it('should be created', inject([SessionFormationService], (service: SessionFormationService) => {
    expect(service).toBeTruthy();
  }));
});
