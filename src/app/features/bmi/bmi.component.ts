import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BmiDialogComponent } from './bmi-dialog/bmi-dialog.component';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css']
})
export class BMIComponent {
  height: number | null = null; 
  weight: number | null = null; 
  history: any[] = []; 

  constructor(private dialog: MatDialog) {
    this.loadHistory(); 
  }

  
  calculateBMI(): void {
    if (!this.height || !this.weight) {
      return; 
    }

    
    if (this.height < 50 || this.height > 250 || this.weight < 20 || this.weight > 300) {
      alert('لطفاً مقادیر معتبر وارد کنید! (قد: 50-250 سانتی‌متر، وزن: 20-300 کیلوگرم)');
      return;
    }

    
    const heightInMeters = this.height / 100;
    const bmi = +(this.weight / (heightInMeters * heightInMeters)).toFixed(2);

    
    const status = this.getStatus(bmi);
    const color = this.getStatusColor(bmi);

    
    const minIdeal = +(18.5 * heightInMeters * heightInMeters).toFixed(2);
    const maxIdeal = +(24.9 * heightInMeters * heightInMeters).toFixed(2);
    const idealWeightRange = `${minIdeal} - ${maxIdeal} کیلوگرم`;

    
    const entry = {
      height: this.height,
      weight: this.weight,
      bmi,
      date: new Date()
    };

    
    this.saveToHistory(entry);

    
    this.dialog.open(BmiDialogComponent, {
      width: '400px',
      data: { bmi, status, color, idealWeightRange }
    });
  }

  
  getStatus(bmi: number): string {
    if (bmi < 18.5) return 'کمبود وزن';
    if (bmi < 24.9) return 'وزن نرمال';
    if (bmi < 29.9) return 'اضافه وزن';
    return 'چاقی';
  }

  
  getStatusColor(bmi: number): string {
    if (bmi < 18.5) return '#ffc107'; 
    if (bmi < 24.9) return '#4caf50'; 
    if (bmi < 29.9) return '#ff9800'; 
    return '#f44336'; 
  }

  
  saveToHistory(entry: any): void {
    this.history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
    this.history.push(entry);
    this.history = this.history.slice(-10); 
    localStorage.setItem('bmiHistory', JSON.stringify(this.history));
  }

  
  loadHistory(): void {
    this.history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
  }

  
  clearHistory(): void {
    localStorage.removeItem('bmiHistory');
    this.history = [];
  }
}