import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAlarmaPage } from './historial-alarma.page';

describe('HistorialAlarmaPage', () => {
  let component: HistorialAlarmaPage;
  let fixture: ComponentFixture<HistorialAlarmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialAlarmaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialAlarmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
