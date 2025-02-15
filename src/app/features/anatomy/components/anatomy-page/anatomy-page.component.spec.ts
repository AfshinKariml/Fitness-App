import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnatomyPageComponent } from './anatomy-page.component';


describe('AnatomyPageComponent', () => {
  let component: AnatomyPageComponent;
  let fixture: ComponentFixture<AnatomyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnatomyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnatomyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
