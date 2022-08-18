import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  //username = new FormControl('', [Validators.required]);
  //email = new FormControl('', [Validators.required, Validators.email]);
  //password = new FormControl('', [Validators.required]);
  hide = true;
  
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) { 
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {  }

  registerUser(){
    this.authService.register(this.registerForm.value).subscribe((res) => {
      if(res) {
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    })
  }
  
  getEmailErrorMessage() {
    let email = this.registerForm.value.email;
    if (email.hasError('required')) {
      return 'You must enter a value';
    }

    return email.hasError('email') ? 'Not a valid email' : '';
  }
}
