import { TestBed } from '@angular/core/testing';

import { ContactoService } from './contacto.service';

describe('ContactoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactoService = TestBed.get(ContactoService);
    expect(service).toBeTruthy();
  });
});
