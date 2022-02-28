import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submit(): void {
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(user)
      .subscribe({
        next: (response) => {
          console.log('User is logged in');
          const user = User.getInstance();
          user.token = response.token;
          user.email = this.loginForm.value.email;
          localStorage.setItem('userEmail', user.email);
          this.route.navigate(['/dashboard']);
        },
        error: () => {
          alert('Вы ввели неправильный email и пароль ');
        },
        complete: () => {}
      });
  }

}