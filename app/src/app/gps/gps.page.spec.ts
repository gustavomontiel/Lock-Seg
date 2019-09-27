import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsPage } from './gps.page';

describe('GpsPage', () => {
  let component: GpsPage;
  let fixture: ComponentFixture<GpsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
