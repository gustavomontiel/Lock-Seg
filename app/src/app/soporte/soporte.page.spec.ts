import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoportePage } from './soporte.page';

describe('SoportePage', () => {
  let component: SoportePage;
  let fixture: ComponentFixture<SoportePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoportePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
