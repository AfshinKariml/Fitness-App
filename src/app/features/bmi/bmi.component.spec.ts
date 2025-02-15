import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BMIComponent } from './bmi.component';


describe('BmiComponent', () => {
  let component: BMIComponent;
  let fixture: ComponentFixture<BMIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BMIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BMIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
