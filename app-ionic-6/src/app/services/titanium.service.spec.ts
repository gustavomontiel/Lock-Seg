import { TestBed } from '@angular/core/testing';

import { TitaniumService } from './titanium.service';

describe('TitaniumService', () => {
  let service: TitaniumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitaniumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
