import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagofacilPage } from './pagofacil.page';

describe('PagofacilPage', () => {
  let component: PagofacilPage;
  let fixture: ComponentFixture<PagofacilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagofacilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagofacilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
