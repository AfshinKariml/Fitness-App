import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { 
  trigger, 
  transition, 
  style, 
  animate, 
  query, 
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
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
    ]),
    
    trigger('scaleIn', [
      transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('400ms ease', 
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class SupportComponent implements OnInit {
  
  isLoading = true;
  
  isMobile = false;

  
  supportItems = [
    {
      title: 'راهنمای کاربری',
      description: 'مشاهده راهنمای استفاده از سیستم',
      icon: 'help_outline'
    },
    {
      title: 'تماس با پشتیبانی',
      description: 'ارتباط مستقیم با تیم پشتیبانی',
      icon: 'headset_mic'
    },
    {
      title: 'سوالات متداول',
      description: 'پاسخ به سوالات رایج کاربران',
      icon: 'question_answer'
    },
    {
      title: 'گزارش مشکل',
      description: 'ثبت و پیگیری مشکلات',
      icon: 'bug_report'
    }
  ];

  
  contactMethods = [
    {
      type: 'phone',
      icon: 'phone',
      label: '09103482687',
      link: 'tel:09103482687'
    },
    {
      type: 'email',
      icon: 'email',
      label: 'afshin.karimi.it@gmail.com',
      link: 'mailto:afshin.karimi.it@gmail.com'
    }
  ];

  constructor(private elementRef: ElementRef) {
    this.checkScreenSize();
  }

  
  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isMobile) {
      const cards = this.elementRef.nativeElement.querySelectorAll('.mat-mdc-card');
      cards.forEach((card: HTMLElement) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    }
  }

  ngOnInit() {
    
    setTimeout(() => {
      this.isLoading = false;
    }, 800);
  }

  
  onContactClick(link: string): void {
    window.open(link, '_self');
  }
}