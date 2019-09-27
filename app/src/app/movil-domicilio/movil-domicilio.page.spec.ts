import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovilDomicilioPage } from './movil-domicilio.page';

describe('MovilDomicilioPage', () => {
  let component: MovilDomicilioPage;
  let fixture: ComponentFixture<MovilDomicilioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovilDomicilioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovilDomicilioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
