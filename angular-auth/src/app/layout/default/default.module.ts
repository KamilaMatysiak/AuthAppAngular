import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from 'src/app/register/register.component';
import { LoginComponent } from 'src/app/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DefaultComponent } from './default.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    UserProfileComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    RouterModule,
    MatButtonModule,
    MatRippleModule,
    MatCardModule
  ]
})
export class DefaultModule { }
