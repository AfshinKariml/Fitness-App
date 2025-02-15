import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BmiDialogComponent } from './bmi-dialog.component';


describe('BmiDialogComponent', () => {
  let component: BmiDialogComponent;
  let fixture: ComponentFixture<BmiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmiDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
