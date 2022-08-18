import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  API_URL: string = 'http://localhost:3000';
  headers = new HttpHeaders().set('Content-type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient, public router: Router){}
  
  register(user: User): Observable<any> {
    let result = this.httpClient.post(`${this.API_URL}/register`, user)
    .pipe(catchError(this.handleError))
    return result
  }

  login(user:User){
    return this.httpClient.post<any>(`${this.API_URL}/login`, user)
    .subscribe((res: any) => {
      localStorage.setItem('access_token', res.access_token)
      this.getUserProfile(res.id).subscribe((res) => {
        this.currentUser = res;
        this.router.navigate(['/profile/' + res.id]);
      })
    })
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false
  }

  logout() {
    if(localStorage.removeItem('access_token') == null) {
      this.router.navigate(['/login']);
    }
  }

  getUserProfile(id: any): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/profile/${id}`,
            {headers: this.headers}).pipe(
              map((res) => {
                return res || {}
              }),
              catchError(this.handleError)
            )
  }

  handleError(error: HttpErrorResponse){
    let msg =''
    if(error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
