import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamarasPage } from './camaras.page';

describe('CamarasPage', () => {
  let component: CamarasPage;
  let fixture: ComponentFixture<CamarasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamarasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamarasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
