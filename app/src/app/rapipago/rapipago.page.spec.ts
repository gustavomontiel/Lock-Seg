import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapipagoPage } from './rapipago.page';

describe('RapipagoPage', () => {
  let component: RapipagoPage;
  let fixture: ComponentFixture<RapipagoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapipagoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapipagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
