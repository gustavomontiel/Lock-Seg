import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicoPage } from './panico.page';

describe('PanicoPage', () => {
  let component: PanicoPage;
  let fixture: ComponentFixture<PanicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
