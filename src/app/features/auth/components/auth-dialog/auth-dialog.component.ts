import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth-dialog',
  template: `
    <!-- عنوان دیالوگ -->
    <h1 mat-dialog-title>ورود به سیستم</h1>

    <!-- محتوای دیالوگ -->
    <mat-dialog-content>
      <p>برای ادامه، لطفاً وارد شوید یا ثبت نام کنید.</p>
    </mat-dialog-content>

    <!-- دکمه‌های دیالوگ -->
    <mat-dialog-actions>
      <!-- دکمه ورود: هدایت کاربر به صفحه احراز هویت -->
      <button class="getLogin" mat-button (click)="navigateToLogin()">ورود</button>
      <!-- دکمه انصراف: بستن دیالوگ -->
      <button class="cancel" mat-button (click)="closeDialog()">انصراف</button>
    </mat-dialog-actions>
  `,
  styles: [`
    
    .getLogin {
      background-color: #4caf50;
      color: white;
    }
    
    
    .cancel {
      background-color: #f44336;
      color: white;
    }
  `]
})
export class AuthDialogComponent {
  
  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private router: Router
  ) {}

  
  navigateToLogin(): void {
    this.dialogRef.close();
    this.router.navigate(['/auth']);
  }

  
  closeDialog(): void {
    this.dialogRef.close();
  }
}