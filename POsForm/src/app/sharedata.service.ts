import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  isLoginSuccessful = false;

  setLoginStatus(status: boolean) {
    this.isLoginSuccessful = status;
  }

  getLoginStatus() {
    return this.isLoginSuccessful;
  }
}
