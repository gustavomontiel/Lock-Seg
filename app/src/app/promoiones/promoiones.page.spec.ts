import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoionesPage } from './promoiones.page';

describe('PromoionesPage', () => {
  let component: PromoionesPage;
  let fixture: ComponentFixture<PromoionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
