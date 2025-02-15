import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-page-training',
  template: `
    <div class="workout-content" fxFlex="100" fxFlex.lt-md="100">

      <mat-tab-group
        class="custom-tab-group"
        animationDuration="300ms"
        *ngIf="!ongoingTraining"
        backgroundColor="primary"
      >
   
        <mat-tab label="تمرین جدید">
          <app-new-training (trainingStart)="ongoingTraining = true"></app-new-training>
        </mat-tab>
      
        <mat-tab label="تمرین قبلی">
          <app-past-training></app-past-training>
        </mat-tab>
      </mat-tab-group>

      
      <app-current-training *ngIf="ongoingTraining"></app-current-training>
    </div>
  `,
  styles: [`
    .workout-content {
      height: 100%;
    }
    
    .custom-tab-group {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background: #3f51b5;
    }

    @media (max-width: 600px) {
  .custom-tab-group {
    min-height: 500px; 
  }
}
  `]
})
export class PageTrainingComponent implements OnInit {
  
  ongoingTraining: boolean = false;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    
    this.trainingService.exerciseChanged.subscribe((exercise) => {
      this.ongoingTraining = !!exercise;
    });
  }
}