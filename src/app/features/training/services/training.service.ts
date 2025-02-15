import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, catchError, takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();
  finishedExChanged = new Subject<Exercise[]>();
  private destroy$ = new Subject<void>();

  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | null = null;

  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    
    this.fireAuth.authState.pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => {
      if (!user) {
        this.clearExerciseData();
      }
    });
  }

  
  fetchAvailableExercises(): void {
    this.db
      .collection('exercises')
      .snapshotChanges()
      .pipe(
        takeUntil(this.destroy$),
        map(docArray => docArray.map(doc => ({
          id: doc.payload.doc.id,
          name: (doc.payload.doc.data() as any).name,
          duration: (doc.payload.doc.data() as any).duration,
          calories: (doc.payload.doc.data() as any).calories,
        }))),
        catchError(error => {
          console.error('Error fetching exercises', error);
          this.exercisesChanged.next(null);
          return [];
        })
      )
      .subscribe(exercises => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  
  startExercise(selectedId: string): void {
    const selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
    if (selectedExercise) {
      this.runningExercise = { ...selectedExercise };
      this.exerciseChanged.next({ ...this.runningExercise });
    }
  }

  
  completeExercise(): void {
    if (this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        date: new Date(),
        state: 'completed',
      });
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  
  cancelExercise(progress: number): void {
    if (this.runningExercise) {
      this.addDataToDatabase({
        ...this.runningExercise,
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'canceled',
      });
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  
  fetchCompleteOrCancelExercises(): void {
    this.fireAuth.currentUser.then(user => {
      if (user) {
        this.db
          .collection('finishedExercises', ref => 
            ref.where('userId', '==', user.uid)
          )
          .valueChanges()
          .pipe(
            takeUntil(this.destroy$),
            map((exercises: any[]) => {
              return exercises.map(exercise => ({
                ...exercise,
                date: exercise.date.toDate()
              }));
            }),
            catchError(error => {
              console.error('Error fetching exercises:', error);
              return [];
            })
          )
          .subscribe((exercises: Exercise[]) => {
            this.finishedExChanged.next(exercises);
          });
      } else {
        this.finishedExChanged.next([]);
      }
    });
  }

  
  getRunningExercise(): Exercise | null {
    return this.runningExercise ? { ...this.runningExercise } : null;
  }

  
  private clearExerciseData(): void {
    this.availableExercises = [];
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    this.exercisesChanged.next(null);
    this.finishedExChanged.next([]);
  }

  
  private addDataToDatabase(exercise: Exercise): void {
    this.fireAuth.currentUser.then(user => {
      if (user) {
        const exerciseWithUserId = {
          ...exercise,
          userId: user.uid
        };
        this.db.collection('finishedExercises')
          .add(exerciseWithUserId)
          .catch(error => console.error('Error adding exercise to database', error));
      }
    });
  }

  
  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}