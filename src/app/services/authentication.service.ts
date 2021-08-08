import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn } from '../model/signIn';
declare let alertify: any;
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly user = new SignIn('test@gmail.com', 'test123');
  isAuthenticated = false;
  constructor(private router: Router) {}

  authenticate(signIn: SignIn): boolean {
    if (this.checkCredentials(signIn)) {
      this.isAuthenticated = true;
      this.router.navigate(['customerDashboard']);
      return true;
    }
    this.isAuthenticated = false;
    alertify.error('Please enter correct email or password');
    // alert('Please enter  correct email or password');
    return false;
  }

  private checkCredentials(signIn: SignIn): boolean {
    return (
      this.checkEmail(signIn.getEmail()) &&
      this.checkPassword(signIn.getPassword())
    );
  }

  private checkEmail(email: string): boolean {
    return email === this.user.getEmail();
  }
  private checkPassword(password: string): boolean {
    return password === this.user.getPassword();
  }
  logOut() {
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }
}
