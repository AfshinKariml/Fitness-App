import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/services/ui.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  
  isLoading = false;
  
  loadingStateSubs: Subscription;

  
  constructor(private authService: AuthService, private uiService: UIService) { }

  
  onSubmit(form: NgForm) {
    
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }

  
  ngOnInit() {
    
    this.loadingStateSubs = this.uiService.loadingState.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  
  ngOnDestroy() {
    this.loadingStateSubs.unsubscribe();
  }

  
  switchMode() {
    this.authService.switchToLogin();
  }
}