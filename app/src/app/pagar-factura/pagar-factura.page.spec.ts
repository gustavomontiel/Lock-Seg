import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarFacturaPage } from './pagar-factura.page';

describe('PagarFacturaPage', () => {
  let component: PagarFacturaPage;
  let fixture: ComponentFixture<PagarFacturaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarFacturaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarFacturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
