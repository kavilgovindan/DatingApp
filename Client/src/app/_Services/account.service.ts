import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();
 
  constructor(private http: HttpClient) { }
 
  login(model: any) {
    return this.http.post(this.baseUrl + 'Account/login', model).pipe(
      map(response => {
        const user = response as User;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  register(model : any){
    return this.http.post("https://localhost:5001/api/Account/register",model).pipe(
      map(response => {
        const user = response as User;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user)
        }
      })
    )
  }
 
  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
 
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}