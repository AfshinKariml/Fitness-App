import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [
    
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('600ms cubic-bezier(0.35, 0, 0.25, 1)', 
          style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translateY(30px)', opacity: 0 }),
          stagger(80, [
            animate('600ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ transform: 'translateY(0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class AboutComponent implements OnInit {
  messageForm: FormGroup;
  isLoading = false;

  
  features = [
    { icon: 'fitness_center', title: 'تمرینات فیتنس متنوع' },
    { icon: 'restaurant_menu', title: 'تغذیه متناسب با اهداف شما' },
    { icon: 'support_agent', title: 'پشتیبانی 24/7' },
    { icon: 'trending_up', title: 'پیشرفت قابل اندازه‌گیری' }
  ];

  constructor(
    private fb: FormBuilder,
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar
  ) {
    
    this.messageForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  
  async sendMessage(): Promise<void> {
    if (this.messageForm.valid) {
      this.isLoading = true;
      try {
        
        await this.firestore.collection('messages').add({
          ...this.messageForm.value,
          timestamp: new Date()
        });

        
        this.snackBar.open('پیام شما با موفقیت ارسال شد', 'بستن', {
          duration: 3000
        });
        this.messageForm.reset();
      } catch (error) {
        
        this.snackBar.open('خطا در ارسال پیام', 'بستن', {
          duration: 3000
        });
      } finally {
        this.isLoading = false;
      }
    }
  }
}