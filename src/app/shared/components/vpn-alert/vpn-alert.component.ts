import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-vpn-alert',
  template: `

    <div *ngIf="isVisible" [@slideIn] class="alert-container">

      <div class="alert-content">

        <div class="alert-icon">
          <i class="fas fa-wifi"></i>
        </div>

        <div class="alert-text">

          <div class="alert-title">
            از تحریم شکن استفاده کنید
          </div>

          <div class="alert-description">
            بهتر است از تحریم شکن 403 استفاده کنید.
          </div>
        </div>

        <button (click)="closeAlert()" class="close-btn">
          ✕
        </button>
      </div>
    </div>
  `,
  styles: [`
    
    .alert-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      direction: rtl;
    }
    
    
    .alert-content {
      background: #1e3a8a;
      color: white;
      padding: 16px;
      border-radius: 6px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-family: system-ui, -apple-system, sans-serif;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      min-width: 280px;
    }
    
    
    .alert-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      color: #3b82f6;
      margin-top: 2px;
    }
    
    
    .alert-text {
      flex: 1;
    }
    
    
    .alert-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    
    .alert-description {
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.5;
    }
    
    
    .close-btn {
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      padding: 4px;
      font-size: 16px;
      line-height: 1;
      margin-right: 8px;
      margin-top: -4px;
    }
    
    
    .close-btn:hover {
      color: white;
    }
  `],
  animations: [

    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class VpnAlertComponent implements OnInit {

  isVisible = false;

  ngOnInit() {

    setTimeout(() => {
      this.isVisible = true;

      setTimeout(() => {
        this.isVisible = false;
      }, 5000);
    }, 1000);
  }


  closeAlert(): void {
    this.isVisible = false;
  }
}