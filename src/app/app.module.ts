import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';




import { AppComponent } from './app.component';
import { HomeComponent } from './layout/Home/home.component';
import { AboutComponent } from './features/about/about.component';
import { SupportComponent } from './features/support/support.component';
import { AnatomyComponent } from './features/anatomy/anatomy.component';
import { AnatomyPageComponent } from './features/anatomy/components/anatomy-page/anatomy-page.component';
import { StopTrainingComponent } from './features/training/shared/stop-training/stop-training.component';
import { NewTrainingComponent } from './features/training/components/new-training/new-training.component';
import { PageTrainingComponent } from './features/training/shared/page-training/page-training.component';
import { PastTrainingComponent } from './features/training/components/past-training/past-training.component';
import { CurrentTrainingComponent } from './features/training/components/current-training/current-training.component';
import { TrainingComponent } from './features/training/shared/training/training.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { SignupComponent } from './features/auth/components/signup/signup.component';
import { AuthDialogComponent } from './features/auth/components/auth-dialog/auth-dialog.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidenavListComponent } from './layout/sidenav-list/sidenav-list.component';
import { ExitDialogComponent } from './shared/components/exit-dialog/exit-dialog.component';
import { VpnAlertComponent } from './shared/components/vpn-alert/vpn-alert.component';




import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './shared/modules/material.module';




import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS,
} from './shared/utils/persian-dateadapter';




import { PersianDatePipe } from './shared/utils/persian-date.pipe';
import { TranslationPipe } from './shared/utils/translation.pipe';




import { MatPaginatorIntl } from '@angular/material/paginator';
import { PersianPaginationIntl } from './shared/utils/pagination.translate';




import { AngularFireModule } from '@angular/fire/compat';
import { environment } from "../environments/environment";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';




import { AuthService } from './features/auth/services/auth.service';
import { TrainingService } from './features/training/services/training.service';
import { UIService } from './shared/services/ui.service';
import { BMIComponent } from './features/bmi/bmi.component';
import { BmiDialogComponent } from './features/bmi/bmi-dialog/bmi-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';





@NgModule({
  
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PageTrainingComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingComponent,
    HomeComponent,
    AboutComponent,
    SupportComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent,
    AuthDialogComponent,
    PersianDatePipe,
    TranslationPipe,
    ExitDialogComponent,
    TrainingComponent,
    AnatomyComponent,
    AnatomyPageComponent,
    VpnAlertComponent,
    BMIComponent,
    BmiDialogComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireAuthModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      
      
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  
  providers: [
    
    { provide: MatPaginatorIntl, useClass: PersianPaginationIntl },
    
    {
      provide: DateAdapter,
      useClass: MaterialPersianDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: PERSIAN_DATE_FORMATS,
    },
    
    AuthService,
    TrainingService,
    UIService
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule { }