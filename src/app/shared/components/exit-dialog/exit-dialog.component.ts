import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-exit-dialog',
  template: `
    <h2 mat-dialog-title>تایید خروج</h2>

    <mat-dialog-content>
      <p>آیا مطمئن هستید می‌خواهید از سیستم خارج شوید؟</p>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button class="getExit" mat-button (click)="onConfirm()">بله، خارج می‌شوم</button>

      <button class="cancel" mat-button (click)="onCancel()">انصراف</button>
    </mat-dialog-actions>
  `,
  styles: [`
    
    .getExit {
      background-color:#4caf50 ;
      color: #fff;
    }

    
    .cancel {
      background-color: #f44336;
      color: #fff;
    }
  `]
})
export class ExitDialogComponent {

  
  constructor(private dialogRef: MatDialogRef<ExitDialogComponent>) {}

  
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  
  onCancel(): void {
    this.dialogRef.close(false);
  }
}