import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-stop-training',
  template: `

    <h1 mat-dialog-title>آیا از توقف تمرین اطمینان دارید؟</h1>


    <mat-dialog-content>
      <p>شما تا این لحظه {{ passData.progress }}% از تمرین خود را انجام داده‌اید</p>
    </mat-dialog-content>


    <mat-dialog-actions>

      <button class="stopTraining-true" mat-button [mat-dialog-close]="true">بله</button>

      <button class="stopTraining-false" mat-button [mat-dialog-close]="false">خیر</button>
    </mat-dialog-actions>
  `,
  styles: [`
    
    .stopTraining-true {
      background-color: #4caf50;
      color: white;
    }

    
    .stopTraining-false {
      background-color: #f44336;
      color: white;
    }
  `]
})
export class StopTrainingComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public passData: any) {}
}