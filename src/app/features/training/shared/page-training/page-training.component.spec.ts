import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTrainingComponent } from './page-training.component';


describe('PageTrainingComponent', () => {
  let component: PageTrainingComponent;
  let fixture: ComponentFixture<PageTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
