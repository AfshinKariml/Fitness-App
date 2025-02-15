import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/services/ui.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  isLoading: boolean = false;
  
  loadingStateSubs: Subscription;

  
  constructor(private authService: AuthService, private uiService: UIService) {}

  
  ngOnInit(): void {
    
    this.loadingStateSubs = this.uiService.loadingState.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  
  onSubmit(form: NgForm) {
    
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }

  
  ngOnDestroy() {
    this.loadingStateSubs.unsubscribe();
  }

  
  switchMode() {
    this.authService.switchToSignup();
  }
}