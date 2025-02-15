import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { AuthDialogComponent } from 'src/app/features/auth/components/auth-dialog/auth-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { TrainingService } from '../../services/training.service';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  
  @Output() trainingStart = new EventEmitter<void>();
  
  @ViewChild('exerciseSelect') exerciseSelect: MatSelect;
  
  
  exercises: Exercise[] | null;
  
  exercisesSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    
    if (this.authService.isAuth()) {
      this.loadExercises();
    }
  }

  ngOnDestroy(): void {
    
    if (this.exercisesSubscription) {
      this.exercisesSubscription.unsubscribe();
    }
  }

  
  onSelectClick(event: Event) {
    event.preventDefault();
    if (!this.authService.isAuth()) {
      const dialogRef = this.dialog.open(AuthDialogComponent);
      dialogRef.afterClosed().subscribe(() => {
        if (this.authService.isAuth()) {
          this.loadExercises();
          
          setTimeout(() => {
            this.exerciseSelect.open();
          });
        }
      });
    } else {
      
      this.exerciseSelect.open();
    }
  }

  
  private loadExercises() {
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(exercises => { 
      this.exercises = exercises;
    });
    this.trainingService.fetchAvailableExercises();
  }

  
  onStartTraining(form: NgForm) {
    if (this.authService.isAuth()) {
      this.trainingService.startExercise(form.value.exercise);
      
      this.trainingStart.emit();
    } else {
      
      this.dialog.open(AuthDialogComponent);
    }
  }
}