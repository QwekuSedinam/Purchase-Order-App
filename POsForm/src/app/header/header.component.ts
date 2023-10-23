import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../sharedata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  constructor(private authService: AuthService,private router: Router, private sharedDataService: SharedDataService) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.sharedDataService.setLoginStatus(false); 
  }

  stock() {
    this.router.navigate(['/stock']);
  }

  POs() {
    this.router.navigate(['/form']);
  }

  homepage() {
    this.router.navigate(['/homepage']);
  }

  isButtonVisible() {
    return this.sharedDataService.getLoginStatus();
  }
}
