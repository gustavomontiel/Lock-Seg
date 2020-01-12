import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPassPage } from './cambiar-pass.page';

describe('CambiarPassPage', () => {
  let component: CambiarPassPage;
  let fixture: ComponentFixture<CambiarPassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarPassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
