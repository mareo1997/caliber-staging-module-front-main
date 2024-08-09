import { LoginService } from './../../services/login-service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ngFireAuth: AngularFireAuth,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async loginUser() {
    const manager = this.loginForm.value;
    const userCredentials = await this.ngFireAuth.signInWithEmailAndPassword(
      manager.email,
      manager.password
    );
    this.loginService
      .getManagerId(userCredentials.user.email)
      .subscribe((managerId) => {
        window.sessionStorage.setItem('managerId', managerId);
        this.router.navigate(['home']);
      });
  }
}
