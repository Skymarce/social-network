import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      secondName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submit() {
    this.authService.registration(this.registrationForm.value).subscribe({
      next: (data) => {
        alert('Пользователь успешно зарегистрирован');
        this.registrationForm.reset();
      },
      error: (error) => {
        alert(`Упс, что-то пошло не так: ${error.message}`);
      },
      complete: () => {}
    });
  }

}