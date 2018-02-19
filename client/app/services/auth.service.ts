import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {User} from '../model/user.interface';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService {
  user = new BehaviorSubject(null);
  token:string;
  options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  constructor(private http:HttpClient, private _cookieService:CookieService) {
  }

  login(email:string, password:string):Observable<boolean> {
    return this.http.post('/auth/local', JSON.stringify({email: email, password: password}), this.options)
      .map((response:any) => {
        const token:string = response && response.token;
        if (token) {
          this.token = token;
          this._cookieService.put('token', token);
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    this.token = null;
    this._cookieService.remove('token');
    this.user.next(null);
  }

  getUser() {
    return this.http.get('/api/users/me')
      .map((response: User) => {
        if (response) {
          this.user.next(response);
          return response;
        } else {
          this.user.next(null);
          return null;
        }
      });
  }

  hasRole = () => this.user.getValue() && this.user.getValue().role;

  isAdmin() {
    return this.hasRole() === 'admin';
  }

  isModerator() {
    return this.hasRole() === 'moderator';
  }

  isCashier() {
    return this.hasRole() === 'cashier';
  }

  generateTemporaryPassword = (email): Observable<any> => {
    return this.http.put('/api/users/temporary-password', {email}, this.options)
  };

  isLoggedIn = () => {
    const currentUser = this.user.getValue();
    if (!currentUser) {
      return this.getUser();
    } else {
      return Observable.create(function (observer) {
        observer.next(currentUser);
        observer.complete();
      });
    }
  }

}
