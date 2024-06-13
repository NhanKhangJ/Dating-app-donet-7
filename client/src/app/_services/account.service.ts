import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) {

  }

  login(model: any): Observable<any> {
    return this.http.post<User>(this.baseUrl + 'account/login', model)
            .pipe(
              map((response: User) =>{
                const user = response;
                if(user){
                  this.setCurrentUser(user);
                }
                return user;
              })
            );
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model)
          .pipe(
            map((user: User) =>{
              if(user){
                this.setCurrentUser(user);
              }
              return user;
            })
          )
  }

  setCurrentUser(user: User){
    user.roles = [];
    const roles = this.getDecodToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  getCurrentUserLogin(){
    return JSON.parse(localStorage.getItem('user')!) as User; 
  }

  logOut(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
