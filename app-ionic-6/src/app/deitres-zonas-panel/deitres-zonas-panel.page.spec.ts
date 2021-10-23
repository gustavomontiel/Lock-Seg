import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeitresZonasPanelPage } from './deitres-zonas-panel.page';

describe('DeitresZonasPanelPage', () => {
  let component: DeitresZonasPanelPage;
  let fixture: ComponentFixture<DeitresZonasPanelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeitresZonasPanelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeitresZonasPanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
