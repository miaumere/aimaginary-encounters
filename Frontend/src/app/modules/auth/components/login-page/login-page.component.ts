import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { BaseComponent } from '../../../../core/base.component';
import { ILoginRequest } from '../../../../core/services/models/login-request.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent extends BaseComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  registerForm = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(/^[a-zA-Z0-9]*$/),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
    retryPassword: new FormControl(null, [Validators.required]),
  });

  isRegister = false;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _toastrService: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {}

  toggleIsRegister(): void {
    this.isRegister = !this.isRegister;
    this.form.reset();
    this.form.markAsPristine();
  }

  login(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const request: ILoginRequest = {
      username: this.form.value.username ?? '',
      password: this.form.value.password ?? '',
    };

    this.subscriptions$.add(
      this._authService.login(request).subscribe({
        next: () => {
          this._router.navigate(['/chat']);
          this._toastrService.success('User logged in!');
        },
        error: (e) => {
          console.log(e);
        },
      })
    );
  }

  register(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (
      this.registerForm.value.password !== this.registerForm.value.retryPassword
    ) {
      this._toastrService.error('Passwords do not match!');
      return;
    }

    const request: ILoginRequest = {
      username: this.registerForm.value.username ?? '',
      password: this.registerForm.value.password ?? '',
    };
    this.subscriptions$.add(
      this._authService.register(request).subscribe({
        next: () => {
          this._router.navigate(['/dashboard']);
          this._toastrService.success('Sucessfully created new user!');
        },
        error: (e) => {
          console.error(e);
        },
      })
    );
  }
}
