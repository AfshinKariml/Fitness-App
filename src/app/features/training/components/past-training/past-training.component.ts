import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Exercise } from '../../models/exercise.model';
import { TrainingService } from '../../services/training.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'duration', 'calories', 'date', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private subscriptions: Subscription[] = [];

  constructor(
    private trainingService: TrainingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.authChange.subscribe(isAuthenticated => {
        if (!isAuthenticated) {
          this.dataSource.data = [];
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        } else {
          this.trainingService.fetchCompleteOrCancelExercises();
        }
      })
    );
  
    this.subscriptions.push(
      this.trainingService.finishedExChanged.subscribe(
        (exercises: Exercise[]) => {
          this.dataSource.data = exercises || [];
        }
      )
    );
  
    if (this.authService.isAuth()) {
      this.trainingService.fetchCompleteOrCancelExercises();
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}