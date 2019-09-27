import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioTecnicoPage } from './servicio-tecnico.page';

describe('ServicioTecnicoPage', () => {
  let component: ServicioTecnicoPage;
  let fixture: ComponentFixture<ServicioTecnicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioTecnicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioTecnicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
