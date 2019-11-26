import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoGaliciaPage } from './banco-galicia.page';

describe('BancoGaliciaPage', () => {
  let component: BancoGaliciaPage;
  let fixture: ComponentFixture<BancoGaliciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoGaliciaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoGaliciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
