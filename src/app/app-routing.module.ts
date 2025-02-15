import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './layout/Home/home.component';
import { SignupComponent } from './features/auth/components/signup/signup.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { TrainingComponent } from './features/training/shared/training/training.component';
import { AboutComponent } from './features/about/about.component';
import { SupportComponent } from './features/support/support.component';
import { AnatomyPageComponent } from './features/anatomy/components/anatomy-page/anatomy-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


import { PermissionService } from './features/auth/guards/auth.guard';
import { BMIComponent } from './features/bmi/bmi.component';




const routes: Routes = [
  
  { path: '', component: HomeComponent, title: 'Fitness Application | Home' },

  
  { path: 'signup', component: SignupComponent, title: 'SignUp' },

  
  { path: 'login', component: LoginComponent, title: 'Login' },

  
  { path: 'auth', component: LoginComponent, title: 'Authentication' },

  
  { 
    path: 'training',
    component: TrainingComponent,
    title: 'Training',
    canActivate: [PermissionService],
  },

  
  { path: 'about', component: AboutComponent, title: 'About' },

  
  { path: 'support', component: SupportComponent, title: 'Support' },

  
  { path: 'anatomy', component: AnatomyPageComponent, title: 'Anatomy' },

  
  { path: 'bmi', component: BMIComponent, title: 'BMI' },

  
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];




@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  
  
  exports: [RouterModule],
})
export class AppRoutingModule { }