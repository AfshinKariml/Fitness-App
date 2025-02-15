import { Component } from '@angular/core';

@Component({
  selector: 'app-anatomy-page',
  templateUrl: './anatomy-page.component.html',
  styleUrls: ['./anatomy-page.component.css']
})
export class AnatomyPageComponent {
  
  isLoading: boolean = true;

  ngOnInit() {
    
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}