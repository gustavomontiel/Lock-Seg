import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagomiscuentasPage } from './pagomiscuentas.page';

describe('PagomiscuentasPage', () => {
  let component: PagomiscuentasPage;
  let fixture: ComponentFixture<PagomiscuentasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagomiscuentasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagomiscuentasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
