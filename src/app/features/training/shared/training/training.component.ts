import { Component } from '@angular/core';

@Component({
  selector: 'app-training',
  template: `
    <!-- کانتینر اصلی صفحه آموزش با استفاده از fxFlex جهت تنظیم اندازه -->
    <div class="container" fxFlex="100" fxFlex.lt-md="100">
      <!-- کامپوننت صفحه آموزش -->
      <app-page-training class="page"></app-page-training>
    </div>
  `,
  styles: [`
    
    :host {
      display: block;
      height: calc(100vh - 84px);
    }

    
    .container {
      height: 100%;
      padding: 20px;
    }

    
    .page {
      height: 100%;
      width: 100%;
    }
  `]
})
export class TrainingComponent { }