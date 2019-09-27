import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasPage } from './facturas.page';

describe('FacturasPage', () => {
  let component: FacturasPage;
  let fixture: ComponentFixture<FacturasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
