import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SharedDataService } from '../sharedata.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router, private authService: AuthService, private sharedDataService: SharedDataService ) {}


  onSubmit() {
    // Call the login method from your AuthService
    const isLoginSuccessful = this.authService.login(this.username, this.password);

    if (isLoginSuccessful) {
      this.router.navigate(['/homepage']);
      this.sharedDataService.setLoginStatus(true);

    } else {
      this.loginError = true;
    }
  }

}
