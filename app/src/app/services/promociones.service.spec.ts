import { TestBed } from '@angular/core/testing';

import { PromocionesService } from './promociones.service';

describe('PromocionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PromocionesService = TestBed.get(PromocionesService);
    expect(service).toBeTruthy();
  });
});
