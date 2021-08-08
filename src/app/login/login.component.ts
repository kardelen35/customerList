import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { SignIn } from '../model/signIn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  onSubmit(signInForm: NgForm) {
    console.log(signInForm.value);
    const signIn = new SignIn(
      signInForm.value.email,
      signInForm.value.password
    );
    this.authenticationService.authenticate(signIn);
  }
}
