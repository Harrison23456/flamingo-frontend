import { TestBed } from '@angular/core/testing';

import { UserwebService } from './userweb.service';

describe('UserwebService', () => {
  let service: UserwebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserwebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
