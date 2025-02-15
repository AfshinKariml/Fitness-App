import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


export interface BmiResultData {
  bmi: number; 
  status: string; 
  color: string; 
  idealWeightRange: string; 
}

@Component({
  selector: 'app-bmi-dialog',
  template: `
    <div class="bmi-dialog-container">
      <div class="dialog-header" [style.backgroundColor]="data.color">
        <h2 mat-dialog-title>نتیجه محاسبه BMI</h2>
      </div>
      
      <mat-dialog-content class="dialog-content">
        <div class="bmi-result-circle" [style.borderColor]="data.color">
          <span class="bmi-value">{{ data.bmi }}</span>
          <span class="bmi-status" [style.color]="data.color">{{ data.status }}</span>
        </div>
        
        <div class="additional-info">
          <div class="info-item">
            <span class="info-label">وضعیت:</span>
            <span [style.color]="data.color">{{ data.status }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">محدوده وزن ایده‌آل:</span>
            <span>{{ data.idealWeightRange }}</span>
          </div>
        </div>
      </mat-dialog-content>
      
      <mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="dialogRef.close()" color="primary">بستن</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    
    .bmi-dialog-container {
      border-radius: 15px;
      overflow: hidden;
      max-width: 420px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    
    .dialog-header {
      color: white;
      padding: 15px;
      text-align: center;
      font-weight: bold;
      font-size: 1.3rem;
    }
    
    
    .dialog-content {
      padding: 20px;
      text-align: center;
      background-color: #3f51b5;
    }
    
    
    .bmi-result-circle {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      border: 6px solid;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto 20px;
      background-color: white;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.2s ease-in-out;
    }

    
    .bmi-result-circle:hover {
      transform: scale(1.05);
    }

    
    .bmi-value {
      font-size: 2.8rem;
      font-weight: bold;
    }
    
    
    .bmi-status {
      font-size: 1.2rem;
      margin-top: 8px;
    }
    
    
    .additional-info {
      background-color: white;
      border-radius: 10px;
      padding: 15px;
      margin-top: 15px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    }
    
    
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e0e0e0;
      font-size: 1rem;
    }

    
    .info-label {
      color: #555;
      font-weight: bold;
    }

    
    .dialog-actions {
      display: flex;
      justify-content: center;
      padding: 15px;
      background-color: #f4f6f9;
    }

    
    .dialog-actions button {
      font-size: 1rem;
      font-weight: bold;
    }
  `]
})
export class BmiDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BmiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BmiResultData
  ) {}
}