import { TestBed } from '@angular/core/testing';

import { PollAnimationService } from './poll-animation.service';

describe('PollAnimationService', () => {
  let service: PollAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
