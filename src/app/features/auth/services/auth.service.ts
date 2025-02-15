import { Injectable } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { AuthData } from '../models/auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../../../shared/services/ui.service';
import { ExitDialogComponent } from '../../../shared/components/exit-dialog/exit-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authChange = new Subject<boolean>();
  private user: User | null = null;
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private fireAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private uiService: UIService
  ) {
    
    this.fireAuth.authState.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        localStorage.setItem('isAuth', 'true');
      } else {
        localStorage.removeItem('isAuth');
      }
      this.authChange.next(this.isAuthenticated);
    });
  }

  
  registerUser(authData: AuthData): void {
    this.uiService.loadingState.next(true);
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.loadingState.next(false);
        this.successfulAuth('ثبت نام با موفقیت انجام شد');
      })
      .catch((error) => {
        this.uiService.loadingState.next(false);
        this.handleAuthError(error, 'ثبت نام انجام نشد');
      });
  }

  
  login(authData: AuthData): void {
    this.uiService.loadingState.next(true);
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.loadingState.next(false);
        this.successfulAuth('ورود با موفقیت انجام شد');
      })
      .catch((error) => {
        this.uiService.loadingState.next(false);
        this.handleAuthError(error, 'ورود انجام نشد');
      });
  }

  
  showLogoutDialog(): void {
    const dialogRef = this.dialog.open(ExitDialogComponent, { width: 'auto' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.logout();
      }
    });
  }

  
  logout(): void {
    this.fireAuth.signOut()
      .then(() => {
        this.isAuthenticated = false;
        localStorage.removeItem('isAuth');
        this.authChange.next(false);
        this.router.navigate(['/auth']);
        this.snackbar.open('شما از حساب خود خارج شدید', 'بستن', { duration: 3000 });
      })
      .catch(error => {
        console.error('خطا در خروج', error);
        this.snackbar.open('خروج انجام نشد', 'بستن', { duration: 3000 });
      });
  }

  
  isAuth(): boolean {
    return this.isAuthenticated || localStorage.getItem('isAuth') === 'true';
  }

  
  switchToSignup(): void {
    this.router.navigate(['/signup']);
  }

  
  switchToLogin(): void {
    this.router.navigate(['/login']);
  }

  
  private successfulAuth(message: string): void {
    this.isAuthenticated = true;
    localStorage.setItem('isAuth', 'true');
    this.authChange.next(true);
    this.router.navigate(['']);
    this.snackbar.open(message, 'بستن', { duration: 3000 });
  }

  
  private handleAuthError(error: any, defaultMessage: string): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuth');
    this.authChange.next(false);
    this.router.navigate(['/auth']);
    const errorMessage = error.message || defaultMessage;
    this.snackbar.open('مشکلی در برقراری ارتباط رخ داده است.', 'بستن', { duration: 3000 });
  }
}