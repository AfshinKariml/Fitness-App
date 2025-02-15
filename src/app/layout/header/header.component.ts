import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
import { Subscription } from 'rxjs';


interface HeaderLink {
  route: string;
  icon: string;
  text: string;
  showForAuth?: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth: boolean = false;         
  subscription!: Subscription;       
  isDarkMode = false;              

  
  links: HeaderLink[] = [
    { route: '/training', icon: 'fitness_center', text: 'تمرین' },
    { route: '/anatomy', icon: 'accessibility', text: 'آناتومی' },
    { route: '/auth', icon: 'account_circle', text: 'ورود/ثبت نام', showForAuth: false },
    { route: '/', icon: 'logout', text: 'خارج شدن', showForAuth: true },
    { route: '', icon: 'home', text: 'خانه' },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    
    this.subscription = this.authService.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });

    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }
  }

  ngOnDestroy() {
    
    this.subscription.unsubscribe();
  }

  
  OnToggleSidenav() {
    this.sidenavToggle.emit();
  }

  
  onLogout() {
    this.authService.showLogoutDialog();
  }

  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }

    
    const event = new CustomEvent('themeChanged', {
      detail: { isDarkMode: this.isDarkMode },
    });
    window.dispatchEvent(event);
  }
}