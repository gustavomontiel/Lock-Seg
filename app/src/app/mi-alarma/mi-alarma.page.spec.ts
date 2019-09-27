import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiAlarmaPage } from './mi-alarma.page';

describe('MiAlarmaPage', () => {
  let component: MiAlarmaPage;
  let fixture: ComponentFixture<MiAlarmaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiAlarmaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiAlarmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
