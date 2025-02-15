import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VpnAlertComponent } from './vpn-alert.component';

describe('VpnAlertComponent', () => {
  let component: VpnAlertComponent;
  let fixture: ComponentFixture<VpnAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpnAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpnAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
