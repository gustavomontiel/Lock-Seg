import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitoPage } from './debito.page';

describe('DebitoPage', () => {
  let component: DebitoPage;
  let fixture: ComponentFixture<DebitoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
