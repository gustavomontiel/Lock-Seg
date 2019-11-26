import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoBbvaPage } from './banco-bbva.page';

describe('BancoBbvaPage', () => {
  let component: BancoBbvaPage;
  let fixture: ComponentFixture<BancoBbvaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoBbvaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoBbvaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
