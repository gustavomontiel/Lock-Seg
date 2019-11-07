import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoMacroPage } from './banco-macro.page';

describe('BancoMacroPage', () => {
  let component: BancoMacroPage;
  let fixture: ComponentFixture<BancoMacroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoMacroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoMacroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
