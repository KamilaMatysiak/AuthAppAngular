import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {  }

  loginUser() {
    this.authService.login(this.loginForm.value)
  }

}
