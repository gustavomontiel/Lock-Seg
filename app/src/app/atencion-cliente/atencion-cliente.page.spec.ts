import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionClientePage } from './atencion-cliente.page';

describe('AtencionClientePage', () => {
  let component: AtencionClientePage;
  let fixture: ComponentFixture<AtencionClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
