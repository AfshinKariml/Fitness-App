import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../../services/training.service';
import { StopTrainingComponent } from '../../shared/stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  
  progress = 0;
  
  timer: any;

  
  @Output() dialogEvent = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  ngOnInit(): void {
    this.startOrResumeTraining();
  }

  
  startOrResumeTraining() {
    const runningExercise = this.trainingService.getRunningExercise();
    
    const increment = runningExercise?.duration
      ? (runningExercise.duration / 100) * 1000
      : 0;
    
    this.timer = setInterval(() => {
      this.progress += 5;
      
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, increment);
  }
  
  
  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTraining();
      }
    });
  }
}