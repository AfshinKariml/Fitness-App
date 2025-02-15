import { Component } from '@angular/core';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `

    <div class="not-found-container" [@fadeIn]>

      <div class="error-message">

        <h1 class="error-number" [@bounce]>404</h1>

        <p>صفحه‌ای که به دنبال آن هستید پیدا نشد!</p>

        <p>لطفاً آدرس صحیح را وارد کنید یا به صفحه اصلی بازگردید.</p>

        <button (click)="goHome()">بازگشت به خانه</button>
      </div>
    </div>
  `,
  styles: [`
    
    .not-found-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 500px;
      max-width: 1200px;
      margin: 80px auto;
      text-align: center;
      font-family: "Roboto", sans-serif;
      color: #3f51b5;
    }

    
    .error-message {
      margin-top: 20px;
    }

    
    .error-number {
      font-size: 120px;
      font-weight: bold;
      margin-bottom: 50px;
    }

    
    .error-message p {
      font-size: 18px;
      margin: 10px 0;
    }

    
    button {
      padding: 10px 20px;
      background-color: #fff;
      color: #3f51b5;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;
      transition: background-color 0.3s, color 0.3s;
    }

    
    button:hover {
      background-color: #1c3d75;
      color: #fff;
    }
    @media (max-width: 600px) {
  .not-found-container  {
    height: 400px;
  }
}
  `],
  animations: [
    
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ]),
    
    trigger('bounce', [
      transition(':enter', [
        animate('1s', keyframes([
          style({ transform: 'translateY(-200px)', opacity: 0, offset: 0 }),
          style({ transform: 'translateY(30px)', opacity: 1, offset: 0.5 }),
          style({ transform: 'translateY(0)', opacity: 1, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class NotFoundComponent {

  
  constructor(private router: Router) {}

  
  goHome(): void {
    this.router.navigate(['/']);
  }
}